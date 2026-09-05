---
name: dependabot-verify
description: >
    Find what Dependabot is flagging on this repo, patch it, open a PR to main, then watch both
    the GitHub Actions run and the Vercel preview build until they finish. Fix whatever goes
    red. When both are green, hand over the preview link and stop — the human does the visual
    check. Use when asked to "check Dependabot", "fix the security alerts", "patch the
    advisories", or to take any dependency bump from alert to a verified-building preview.
---

# Dependabot → patch → PR → both builds green → hand over the link

The contract, end to end:

1. Find what Dependabot is unhappy about.
2. Patch it.
3. Open a PR to `main` (nothing else triggers CI or a preview).
4. Watch **GitHub Actions** and **the Vercel preview build**. Fix anything red.
5. Both green → **post the preview link and stop.**

Step 5 is a full stop. Do **not** try to fetch or verify the rendered preview yourself — you
can't (see [Why you can't open the preview](#why-you-cant-open-the-preview)), and it isn't
your job. The human opens the link and judges whether it looks right.

## 0. What you have and don't have

- There is **no Dependabot MCP tool.** `mcp__github__*` has no `list_dependabot_alerts`. Don't
  go looking.
- Direct `curl https://api.github.com/...` is **blocked** (gated to the GitHub MCP).
- So **read the advisories from `pnpm audit`** — it queries the same GitHub Advisory Database
  Dependabot uses, and the set matches in practice.
- `git push` prints a `remote: ... /security/dependabot` banner with GitHub's own count. Free
  cross-check that you found everything.

## 1. Find the advisories

```bash
pnpm audit --json > /tmp/audit.json   # exit code 1 just means "findings exist"
```

Works **from the lockfile alone** — no `node_modules` needed, so run it before installing.
Parse it; the human-readable output buries the dependency path:

```bash
node -e "
const a=JSON.parse(require('fs').readFileSync('/tmp/audit.json','utf8'));
console.log(JSON.stringify(a.metadata.vulnerabilities));
for (const v of Object.values(a.advisories||{})) {
  console.log(v.severity.toUpperCase(), v.module_name, v.vulnerable_versions, '->', v.patched_versions, '|', v.github_advisory_id);
  (v.findings||[]).flatMap(f=>f.paths).slice(0,3).forEach(p=>console.log('   ', p));
}"
```

The path tells you the blast radius: a transitive **dev** dependency (eslint plugins,
commitlint, test tooling) is low risk; anything in the runtime tree deserves more care at
step 3.

## 2. Patch via `pnpm.overrides`

Almost every advisory lands on a package that is **not a direct dependency**, and
`package.json` already carries ~35 `pnpm.overrides` entries for exactly this. Follow the
pattern:

- Already in `pnpm.overrides` → raise its floor (`">=4.1.2"` → `">=4.1.3"`).
- Not there → add `"<pkg>": ">=<patched version>"`.
- Use the advisory's `patched_versions` floor, not a hard pin — a `>=` floor lets pnpm dedupe.
- `resolutions` is the yarn-style sibling; put new entries in `pnpm.overrides` unless the
  package is already under `resolutions`.

```bash
pnpm install --no-frozen-lockfile   # regenerate the lockfile
pnpm audit                          # must print "No known vulnerabilities found"
```

Never hand-edit `pnpm-lock.yaml`. A correct override often makes it *shrink* — two copies
collapsing into one. That's the fix working, not a mistake.

## 3. Validate locally before pushing

A red push costs a full CI cycle. Run:

```bash
pnpm lint        # must be 0 ERRORS. ~111 vue/max-len warnings on privacy-policy.vue are
                 # pre-existing — don't "fix" them, that's not this PR's job
pnpm typecheck   # the two @nuxt/supabase "Missing NUXT_PUBLIC_SUPABASE_*" warnings are
                 # normal without a .env
pnpm build       # catches most of what Vercel would hit
```

`pnpm build` needs a minimal env:

```bash
export SUPABASE_URL=http://127.0.0.1:54321 SUPABASE_PUBLISHABLE_KEY=dummy SUPABASE_SECRET_KEY=dummy
export NUXT_SITE_URL=http://localhost:3000 NUXT_SITE_NAME=CI VITE_ORIGIN=http://localhost:3000
```

`pnpm test` (e2e) **cannot run here** — it needs `supabase start`, which needs Docker. CI
covers it.

Optional but cheap, and worth it on anything touching the Nuxt/Vue tree — confirm the built
server actually serves, not just builds:

```bash
nohup node .output/server/index.mjs > /tmp/srv.log 2>&1 &
sleep 6
NO_PROXY='*' curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3000/legal-notice
```

- `curl` **must bypass the agent proxy** (`NO_PROXY='*'`, and `127.0.0.1` not `localhost`) or
  you get `000` and misread a healthy server as dead.
- Hit a **prerendered** route (`/legal-notice`, `/privacy-policy`). `/` is ISR and fetches
  Supabase — locally it hangs and returns `000`. Expected, not a regression.
- `EADDRINUSE` on a retry means the first server started fine. `pkill -f
  '.output/server/index.mjs'`.
- `rm -rf .output` after (~39 MB; disk here is a fixed allowance).

And after any Nuxt/Vue-adjacent change, check the alignment guard:

```bash
grep -n "^  vue@\|^  @vue/server-renderer@" pnpm-lock.yaml | sort -u
```

A single aligned version (currently `3.5.39`) is what you want. A split between `vue` and
`@vue/server-renderer` is what caused `FUNCTION_INVOCATION_FAILED` on Vercel before.

## 4. Open the PR

**Pushing the branch triggers nothing.** `.github/workflows/ci.yml` fires only on
`pull_request`/`push` to `main` plus `workflow_dispatch`. Opening the PR to `main` is what
starts *both* the Actions run and the Vercel preview deploy.

Use `mcp__github__create_pull_request`. There is **no PR template** in this repo. Commits are
commitlint-enforced (conventional commits) — `chore(deps): ...` for dependency patches.

Then immediately:

```
mcp__github__subscribe_pr_activity(owner, repo, pullNumber)
```

## 5. Watch both builds

### The GitHub hook

`subscribe_pr_activity` is the hook. Failures and comments arrive as
`<wake reason="external-event">` envelopes. In practice a `check_suite.completed` event also
arrives when nothing is left running or failed — a usable "CI is done" signal.

**Verify the event's `head_sha` against the PR's current head before believing it.** If you
pushed again, a completion event for the *previous* commit will still land and looks identical.

Expect **six** checks, not the two `CLAUDE.md` documents:

| Check | Workflow | Typical time |
| --- | --- | --- |
| `lint-and-typecheck` | `ci.yml` | ~45s |
| `e2e-tests` | `ci.yml` | ~5–7 min — **always finishes last** |
| `Analyze (javascript-typescript)` | CodeQL | ~1 min |
| `Analyze (actions)` | CodeQL | ~45s |
| `CodeQL` | CodeQL | instant (rollup) |
| `Vercel Preview Comments` | Vercel | instant — **means nothing about the build** |

Confirm with `mcp__github__pull_request_read` method `get_check_runs` (it reports on the PR's
current head). `mcp__github__get_job_logs` with `failed_only: true` and `return_content: true`
for diagnosis.

### The Vercel "hook"

There is no direct Vercel webhook into the session — but you get one for free through the
GitHub subscription: **the `vercel[bot]` PR comment is edited in place as the deploy
progresses**, and each edit arrives as an `issue_comment.edited` event. The base64 blob in the
comment carries `"nextCommitStatus":"PENDING"` → `"DEPLOYED"`, and the visible table flips
Building → Ready.

Treat that as a nudge, not proof. Confirm against the API:

```
mcp__Vercel__list_deployments(projectId, teamId, since=<recent ms>)
```

- team `team_PYrbwmBmWpsDINtLsvdoAbMa` (`nagells-projects`)
- project `prj_YYhOXiqyNc5KMEubLs1FeK5BYRsJ` (`portfolio-nuxt`)

**Always pass `since`** — the unfiltered call returns 20 deployments with full commit messages
and is enormous.

Match `meta.githubCommitSha` to the PR's head; the preview is the one with `target: null`.
Then:

- `mcp__Vercel__get_deployment` → `state` must be `READY` (`ERROR` → next section)
- `mcp__Vercel__get_deployment_build_logs` with `errorsOnly: true` → must return no error lines

Both builds run concurrently. Vercel usually finishes first (~2 min); `e2e-tests` is the long
pole. Don't declare anything until CI's own head matches and every check has a conclusion.

## 6. If something is red, repair it

This is the half of the job that isn't waiting.

- **Vercel `ERROR`** → `get_deployment_build_logs` (`errorsOnly: true` first, then the tail).
  Historically this repo's Vercel-only failures were dependency-resolution problems that CI
  didn't catch: `@babel/generator@8` needing Node ≥22.18 (fixed by `engines.node = "22"`), and
  a pnpm split between Vue core and `@vue/server-renderer` (fixed by pinning all `@vue/*`).
  Keep those mitigations; re-check the alignment guard from step 3.
- **CI red** → get the job logs, reproduce locally where you can, fix, re-run the step-3 checks,
  push. Keep the fix minimal — don't widen the PR.
- **The one known flake:** `e2e-tests` → "Wait for dev server" timing out (the timeout was
  already raised 60s → 120s). If that's the failure *and* the Vercel build for the same commit
  is green, it's a flake — re-run once. Any other e2e failure is real. Never skip, disable, or
  quarantine a test to get green.
- Each push restarts both builds. Go back to step 5 and watch the new head.

## 7. Hand over the link and stop

When CI is green on the current head and the Vercel preview for that same sha is `READY` with
clean build logs, report:

- what Dependabot flagged and what you changed
- the check names and their conclusions
- the Vercel deployment state
- **the preview link**

The link is the branch alias, stable across pushes:

```
https://portfolio-nuxt-git-<branch-slug>-nagells-projects.vercel.app
```

Read it off `meta.branchAlias` in the deployment, or the `vercel[bot]` comment's Preview
column. Then stop. Don't merge, don't verify the render, don't keep polling.

## Why you can't open the preview

Worth knowing so you don't burn turns rediscovering it:

- `ssoProtection` on this project is `all_except_custom_domains` (confirm with
  `get_project_deployment_protection`). Every `*.vercel.app` preview 302s to
  `vercel.com/sso-api`.
- `mcp__Vercel__web_fetch_vercel_url` **follows no redirects** and never sets the SSO cookie —
  it just returns the 302. A `_vercel_share` token from `get_access_to_vercel_url` doesn't help;
  the tool overwrites it with its own and still 302s.
- `WebFetch` returns `EGRESS_BLOCKED` for `*.vercel.app`; `curl` from the container gets
  `CONNECT tunnel failed, response 403`. The network policy denies the host outright.
- The Protection Bypass secret (`VERCEL_AUTOMATION_BYPASS_SECRET`) would work, but **it is not
  obtainable here — already checked, don't re-search:** `.env`/`.env.*` are gitignored so a
  fresh clone never has them (only `.env.example`, with placeholders); there's no `.vercel/`
  directory; it's not in the session environment; and no Vercel MCP tool reads project env vars
  (`get_project` returns metadata only).
- Custom domains *are* exempt, so `mcp__Vercel__web_fetch_vercel_url` fetches
  `https://www.dawidnitka.com/...` fine — relevant only if you're ever asked to check
  production after a merge. Use the `www.` host; the bare domain 308s and the tool won't follow.

None of this is a problem: handing over the link is the intended end of the job.

## Caveats worth re-reading

- Pushing a branch triggers nothing. The PR does.
- Six checks, not two. `Vercel Preview Comments` going green means nothing.
- `check_suite.completed` can arrive for a **stale** head sha — always compare against the PR's
  current head.
- The `vercel[bot]` comment edits are your Vercel hook, but confirm state via the API.
- `list_deployments` without `since` returns a wall of text.
- Empty Vercel runtime logs on a protected preview prove nothing — the edge rejects the request
  before the function ever runs.
- Local `curl` needs the proxy bypassed or a healthy server reads as dead (`000`).
- `/` hangs locally without Supabase. Smoke-test `/legal-notice` instead.
- `pnpm test` needs Docker; can't run here.
- 111 `vue/max-len` warnings are pre-existing. `pnpm lint` exiting 0 with warnings is a pass.
- `.claude` is gitignored wholesale, so this file is force-added. It stays tracked, but
  `git add` still refuses the ignored path — use `git add -f` every time you edit it.
- Clean up `.output` (~39 MB); disk is a fixed allowance.
