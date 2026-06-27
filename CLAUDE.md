# Claude Instructions - Portfolio Nuxt

## Architecture Overview

**Hybrid Nuxt 4 portfolio** with dual rendering:

- **Home page** (`/`): **ISR** — cached indefinitely on Vercel CDN, revalidated on-demand via `revalidatePage()`
- **Static pages** (`/legal-notice`, `/privacy-policy`): **prerendered** at build time
- **Admin dashboard** (`/admin/**`): **SSR** with server-side auth and CRUD

**Stack**: Nuxt 4 + Supabase + TypeScript + Shadcn-vue + Tailwind CSS v4 + Vitest

## Key Project Patterns

### Authentication & Routing

- GitHub OAuth via Supabase (`app/middleware/admin-auth.ts`)
- Admin routes protected by `defineNuxtRouteMiddleware` checking `useSupabaseUser()`
- Redirect flow: unauthenticated → `/login` → `/admin/projects` after auth
- Admin routes excluded from sitemap and have `robots: false`

### Type Safety Flow

1. Database schema → `types/database.types.ts` (auto-generated)
2. Supazod transforms → `types/schemas.ts` (validation schemas)
3. Business types → `types/{projects,experience,files}.types.ts`

**Commands**:

- `pnpm types:supabase:local` - Generate from local DB
- `pnpm types:supabase` - Generate from production (requires project ID update)

### Component Architecture

- **Shadcn-vue components**: `app/components/ui/` (don't modify directly)
- **Business components**: `app/components/{admin,front,common}/`
- **Reusable patterns**: `AddEditFormWrapper.vue` for all CRUD forms
- **Composables**: `app/composables/` — `useAddEditForm.ts` handles add/edit state management

### Testing Strategy

- **E2E tests**: Vitest + Playwright (`app/pages/__tests__/*.e2e.test.ts`)
- **Test configuration**: `app/pages/__tests__/helpers/vitestConfig.ts`
- **Test IDs**: Centralized in `app/utils/testIds.ts`
- **Browser control**: Set `IS_BROWSER_VISIBLE = true` for debugging

## Essential Commands

```bash
pnpm supabase start        # Start local Supabase (Docker Desktop required)
pnpm dev                   # Start Nuxt dev server
pnpm supabase db reset     # Apply migrations locally
pnpm supabase migration new <name>  # Create new migration
pnpm test                  # Run Vitest tests (requires pnpm dev running)
pnpm playwright install    # First-time setup for e2e tests
pnpm lint                  # Run ESLint
pnpm typecheck             # Run TypeScript checks
```

## Critical Development Notes

- **Path aliases**: `~/` = `app/`, use `~~/` for project root (e.g. `~~/types/`)
- **Route protection**: Always use `middleware: 'admin-auth'` for protected pages
- **Type generation**: Run after any database schema changes
- **Testing isolation**: Tests run with `--no-file-parallelism` due to shared state
- **Image uploads**: Use `useGetPublicURL()` composable for consistent URL handling
- **Form validation**: Leverage Zod schemas from `types/schemas.ts`
- **shadcn-nuxt**: Using 2.x line with Tailwind v4
- **Always run `pnpm lint` and `pnpm typecheck`** before considering tasks complete

## Common Debugging

- **Auth issues**: Check GitHub OAuth callback URLs match environment
- **Type errors**: Regenerate types after DB changes
- **ISR problems**: Verify `routeRules` in `nuxt.config.ts`; check `VERCEL_BYPASS_TOKEN`  
is set in Vercel env vars and was available at build time (see `docs/DEVELOPMENT.md`)
- **Test failures**: Ensure dev server running, check browser visibility settings

## CI / Deploy Verification (GitHub + Vercel MCP)

When verifying a change end-to-end, use the **GitHub MCP** (`mcp__github__*`) and
**Vercel MCP** (`mcp__Vercel__*`) tools. These are configured at the environment
level (not the repo), so availability depends on the session — discover IDs at
runtime with `list_teams` → `list_projects` → `list_deployments` if the values
below have changed.

- **Vercel team**: `team_PYrbwmBmWpsDINtLsvdoAbMa` (`nagells-projects`)
- **Vercel project**: `prj_YYhOXiqyNc5KMEubLs1FeK5BYRsJ` (`portfolio-nuxt`, framework `nuxtjs`)
- **Production domains**: `dawidnitka.com`, `www.dawidnitka.com`

### Trigger flow (important)

- **Pushing a feature branch does NOT run CI.** `.github/workflows/ci.yml` only
  triggers on `pull_request`/`push` to `main` (+ `workflow_dispatch`). To get a
  GitHub Actions signal you must open a PR to `main`.
- **Opening a PR to `main`** triggers both the GitHub Actions CI run
  (`lint-and-typecheck` + `e2e-tests`) and a **Vercel preview** deploy (`target: null`).
- **Merging to `main`** triggers the **Vercel production** deploy
  (`target: "production"`, aliased to the domains above).
- Webhooks delivered to a subscribed session cover failures/comments but **not**
  CI success or production-deploy completion — poll those explicitly via the MCP
  tools (e.g. a short recurring `CronCreate` self-check that deletes itself once
  the run/deploy reaches a terminal state).
- Direct `api.github.com` access via `curl` is blocked in web sessions (gated to
  the GitHub MCP) — use `mcp__github__actions_*` / `mcp__github__get_job_logs`.

### Known gotchas (history)

- **e2e "Wait for dev server"** can time out even after the dev server builds;
  the timeout was raised 60s → 120s. A failure here is usually a flake, not a
  prod break — the same commit's Vercel build often stays green.
- **Nuxt 4.4.x upgrades** historically broke Vercel with `FUNCTION_INVOCATION_FAILED`:
  (1) vue-router pulled `@babel/generator@8` (ESM, needs Node ≥22.18) → fixed by
  `engines.node = "22"`; (2) pnpm split Vue core vs `@vue/server-renderer` → fixed
  by pinning all `@vue/*` to `>=3.5.34`. Keep these mitigations and verify Vue
  resolves to a single aligned version (`pnpm ls vue @vue/server-renderer`) after
  any Nuxt bump.
