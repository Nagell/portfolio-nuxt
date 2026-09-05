---
name: dependabot-verify
description: >
    Find what Dependabot is flagging on this repo, patch it, open a PR to main, and verify
    end-to-end that both GitHub Actions CI and the Vercel deploy are genuinely healthy — build
    green AND the page actually rendering. Use when asked to "check Dependabot", "fix the
    security alerts", "patch the advisories", or to take a dependency bump all the way from
    alert to verified deploy. Also use for any dependency change that has to be proven safe on
    Vercel, since this project has a history of builds that pass and then fail at runtime.
---

# Dependabot → patch → PR → CI → Vercel verification

The job is not done when the build is green. It is done when a real HTTP request to the
deployed URL returns rendered HTML. This project has a history of builds that succeed and then
throw `FUNCTION_INVOCATION_FAILED` at runtime, so **always** verify rendering separately from
verifying the build.

## 0. Before anything: know what tools you actually have

- There is **no Dependabot MCP tool.** `mcp__github__*` has no `list_dependabot_alerts`.
  Don't waste turns searching for one.
- Direct `curl https://api.github.com/...` is **blocked** in web sessions (gated to the GitHub
  MCP). Don't try to read the alerts API by hand.
- So: **read the advisories from `pnpm audit`**, not from GitHub. It queries the same GitHub
  Advisory Database that Dependabot uses, so the set matches in practice.
- `git push` prints a `remote: ... /security/dependabot` banner with GitHub's own count. Use it
  as a cross-check that you found everything.

## 1. Find the advisories

```bash
pnpm audit --json > /tmp/audit.json   # exit code 1 just means "findings exist"
```

`pnpm audit` works **from the lockfile alone** — no `node_modules` needed, so run it before
installing anything. Parse it rather than eyeballing it; the human-readable output buries the
dependency path:

```bash
node -e "
const a=JSON.parse(require('fs').readFileSync('/tmp/audit.json','utf8'));
console.log(JSON.stringify(a.metadata.vulnerabilities));
for (const v of Object.values(a.advisories||{})) {
  console.log(v.severity.toUpperCase(), v.module_name, v.vulnerable_versions, '->', v.patched_versions, '|', v.github_advisory_id);
  (v.findings||[]).flatMap(f=>f.paths).slice(0,3).forEach(p=>console.log('   ', p));
}"
```

The dependency path is the important part: it tells you whether the package is a **runtime**
dependency (risky to bump, must verify rendering hard) or a **transitive dev** dependency
(eslint plugins, commitlint, test tooling — low blast radius, but still worth the full check).

## 2. Patch via `pnpm.overrides`, not direct upgrades

Almost every advisory here lands on a package that is **not a direct dependency**. The
established pattern in `package.json` is a `pnpm.overrides` entry, and there are ~35 of them
already. Follow it:

- Package already in `pnpm.overrides` → bump its floor (`">=4.1.2"` → `">=4.1.3"`).
- Package not there yet → add `"<pkg>": ">=<patched version>"`.
- Use the `patched_versions` floor from the advisory, not a pin. A `>=` floor lets pnpm dedupe;
  a hard pin fights the rest of the tree.
- `resolutions` (the top-level key) exists too, but it is the yarn-style sibling — put new
  entries in `pnpm.overrides` unless the package is already listed under `resolutions`.

Then:

```bash
pnpm install --no-frozen-lockfile   # regenerates the lockfile with the new overrides
pnpm audit                          # must print "No known vulnerabilities found"
```

Never hand-edit `pnpm-lock.yaml`. A correct override often makes the lockfile *shrink*, because
two copies of the package collapse into one — that's a good sign, not a mistake.

## 3. Validate locally before pushing

CI is slow and a red push costs a full cycle. Run, in order:

```bash
pnpm lint        # must be 0 ERRORS. ~111 vue/max-len warnings on privacy-policy.vue are
                 # pre-existing and expected — do not "fix" them, it's out of scope.
pnpm typecheck   # the two @nuxt/supabase "Missing NUXT_PUBLIC_SUPABASE_*" warnings are normal
                 # without a .env; clean output otherwise
pnpm build       # catches the class of failure Vercel would hit
```

`pnpm test` (e2e) **cannot run here** — it needs `supabase start`, which needs Docker. Don't
try; let CI cover it.

For `pnpm build` you need a minimal env or the build will complain:

```bash
export SUPABASE_URL=http://127.0.0.1:54321 SUPABASE_PUBLISHABLE_KEY=dummy SUPABASE_SECRET_KEY=dummy
export NUXT_SITE_URL=http://localhost:3000 NUXT_SITE_NAME=CI VITE_ORIGIN=http://localhost:3000
```

### Smoke-test the built server, not just the build

This is the step that catches "builds fine, renders nothing":

```bash
nohup node .output/server/index.mjs > /tmp/srv.log 2>&1 &
sleep 6
NO_PROXY='*' curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/legal-notice
NO_PROXY='*' curl -s http://127.0.0.1:3000/legal-notice | grep -o '<title>[^<]*</title>'
```

- **`curl` must bypass the agent proxy** or you get `000` with no error. Set `NO_PROXY='*'` (and
  unset `HTTP_PROXY`/`HTTPS_PROXY` in that shell) and use `127.0.0.1`, not `localhost`.
- Hit a **prerendered** route (`/legal-notice`, `/privacy-policy`). `/` is ISR and fetches from
  Supabase — locally that hangs and returns `000`, which is *expected* and not a regression.
- `EADDRINUSE` on the second attempt means the first server actually started fine. `pkill -f
  '.output/server/index.mjs'` before retrying.
- `rm -rf .output` afterwards — it's ~39 MB and disk here is a fixed allowance.

Also re-check the Vue alignment guard after any dep change touching the Vue/Nuxt tree:

```bash
grep -n "^  vue@\|^  @vue/server-renderer@" pnpm-lock.yaml | sort -u
```

A single aligned `3.5.39` is what you want. A split between `vue` and `@vue/server-renderer` is
the exact thing that caused `FUNCTION_INVOCATION_FAILED` in the past.

## 4. Open the PR — this is the only thing that triggers anything

**Pushing the branch runs nothing.** `.github/workflows/ci.yml` fires only on
`pull_request`/`push` to `main` plus `workflow_dispatch`. Opening the PR to `main` is what
starts both the Actions run and the Vercel preview deploy.

Use `mcp__github__create_pull_request`. There is **no PR template** in this repo, so write the
body yourself: a table of advisory → package → path, what you changed, and the verification you
actually ran.

Commits are **commitlint-enforced** (conventional commits, `@commitlint/config-conventional`).
Use `chore(deps): ...` for dependency patches.

## 5. Watch CI

Expect **six** checks, not two — CLAUDE.md only documents the CI workflow:

| Check | Workflow | Typical time | Notes |
| --- | --- | --- | --- |
| `lint-and-typecheck` | `ci.yml` | ~45s | |
| `e2e-tests` | `ci.yml` | ~7 min | Supabase + Playwright; **last to finish, always** |
| `Analyze (javascript-typescript)` | CodeQL | ~1 min | |
| `Analyze (actions)` | CodeQL | ~40s | |
| `CodeQL` | CodeQL | instant | the rollup |
| `Vercel Preview Comments` | Vercel | instant | means nothing about the build |

Budget ~8 minutes for the whole run and don't poll tighter than that for `e2e-tests`.

Poll with `mcp__github__pull_request_read` method `get_check_runs`. Webhooks deliver failures
but **not** successes, so you must poll for green. `mcp__github__get_job_logs` with
`failed_only: true` and `return_content: true` for diagnosis.

**The known flake:** `e2e-tests` → "Wait for dev server" timing out. The timeout was already
raised 60s → 120s. If that is the failure and the Vercel build for the same commit is green,
it's a flake — re-run once, don't start "fixing" it. Any *other* e2e failure is real.

## 6. Verify Vercel — build AND render

IDs (rediscover with `list_teams` → `list_projects` → `list_deployments` if stale):

- team `team_PYrbwmBmWpsDINtLsvdoAbMa` (`nagells-projects`)
- project `prj_YYhOXiqyNc5KMEubLs1FeK5BYRsJ` (`portfolio-nuxt`)
- production domains `dawidnitka.com`, `www.dawidnitka.com`

### The preview URL is not reachable from this session

This is the biggest trap, so plan for it up front:

- `ssoProtection` on this project is **`all_except_custom_domains`** (confirm with
  `get_project_deployment_protection`). Every `*.vercel.app` preview URL 302s to
  `vercel.com/sso-api`.
- `mcp__Vercel__web_fetch_vercel_url` **does not follow that redirect** and does not set the
  SSO cookie. It returns the raw 302. Passing a `_vercel_share` token from
  `get_access_to_vercel_url` does not help — the tool overwrites it with its own and still
  302s.
- `WebFetch` returns `EGRESS_BLOCKED` for `*.vercel.app`, and `curl` from the container gets
  `CONNECT tunnel failed, response 403` — the network policy denies the host outright. Check
  `curl -sS "$HTTPS_PROXY/__agentproxy/status"` if you want to confirm; don't burn turns
  retrying.

So **you cannot verify a preview render on your own.** Say so plainly instead of
implying you checked. The ways through, in order of preference:

1. **Verify production after merge.** Custom domains are exempt from SSO, and
   `mcp__Vercel__web_fetch_vercel_url` fetches `https://www.dawidnitka.com/...` fine (200 with
   full SSR'd HTML). Use `www.` — bare `dawidnitka.com` 308s to `www.` and the tool won't
   follow.
2. **Ask the user for the Protection Bypass secret.** The project has one
   (`VERCEL_AUTOMATION_BYPASS_SECRET`, documented in `docs/DEVELOPMENT.md` and used by
   `server/utils/revalidatePage.ts`). With it, fetch
   `<preview-url>/path?x-vercel-protection-bypass=<secret>&x-vercel-set-bypass-cookie=true`.

   **The value is not obtainable from this session — this has been checked, don't re-search:**
   `.env` and `.env.*` are gitignored so a fresh clone never has them (only `.env.example`,
   which holds placeholders); there is no `.vercel/` directory; the var is not in the session
   environment; and the Vercel MCP exposes no tool that reads project environment variables
   (`get_project` doesn't return them). The secret lives only in Vercel's own build/runtime
   env and in the user's dashboard. Only the user can supply it.
3. **Ask the user to open the preview themselves** — they're logged into Vercel.

Do **not** flip `ssoProtection` off with `update_project_deployment_protection` to get a look.
That exposes the admin dashboard on the preview and it's the user's security setting, not
yours.

### What you *can* verify without access

- `mcp__Vercel__list_deployments` → find the deployment whose `meta.githubCommitSha` matches
  your commit; the preview is `target: null`. **Pass `since`** — the unfiltered call returns 20
  deployments with full commit messages and is enormous.
- `get_deployment` / the list entry → `state` must be `READY`.
- `get_deployment_build_logs` with `errorsOnly: true` → must come back with no error lines.
- `get_runtime_errors` / `get_runtime_logs`. Note that on an SSO-protected preview these will
  be **empty even if the app is broken**, because the edge rejects the request before the
  function is ever invoked. Empty is not evidence of health here.
- The `e2e-tests` CI job is the strongest render signal you can get unaided: it drives the real
  app through Playwright on this exact commit.

## 7. Report

State each gate separately and honestly:

- advisories cleared (`pnpm audit`)
- CI: name the checks and their conclusions
- Vercel: build state, build-log errors
- **render: say which environment you actually fetched.** If you could only prove the render
  locally and via CI e2e, say the Vercel preview render is unverified and why — do not round it
  up to "verified on Vercel".

## Caveats worth re-reading

- Build success ≠ rendering. Always try to fetch the deployed page.
- **The preview URL is unreachable from this session** (SSO + egress policy). Plan to verify on
  production after merge, or ask the user. Don't claim a preview render you didn't do.
- `web_fetch_vercel_url` follows **no** redirects — feed it the final URL (`www.`, not bare).
- No Dependabot MCP tool; no `curl` to `api.github.com`. `pnpm audit` is the source of truth.
- Pushing a branch triggers nothing. The PR does.
- Six checks, not two. `Vercel Preview Comments` going green means nothing. `e2e-tests` takes
  ~7 minutes and finishes last.
- Empty Vercel runtime logs on a protected preview prove nothing — the edge blocked the request
  before the function ran.
- `list_deployments` without `since` returns a wall of text. Filter it.
- The bypass secret is not on disk, not in the session env, and not readable via MCP. Don't
  spend turns hunting for it — ask, or verify on production instead.
- Local `curl` needs the proxy bypassed (`NO_PROXY='*'`, `127.0.0.1`) or a working server reads
  as dead (`000`).
- `/` hangs locally without Supabase — expected, not a regression. Smoke-test `/legal-notice`.
- `pnpm test` needs Docker; can't run here.
- 111 `vue/max-len` warnings are pre-existing. `pnpm lint` exiting 0 with warnings is a pass.
- Clean up `.output` (~39 MB) — disk is a fixed allowance.
