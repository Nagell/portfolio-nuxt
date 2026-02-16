# Claude Instructions - Portfolio Nuxt

## Architecture Overview

**Hybrid Nuxt 4 portfolio** with dual rendering:

- **Public pages** (`/`, `/legal-notice`, `/privacy-policy`): **ISR** with 1-hour cache
- **Admin dashboard** (`/admin/**`): **SSR** with server-side auth and CRUD

**Stack**: Nuxt 4 + Supabase + TypeScript + Shadcn-vue + Tailwind CSS v3 + Vitest

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

- `yarn types:supabase:local` - Generate from local DB
- `yarn types:supabase` - Generate from production (requires project ID update)

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
yarn supabase start        # Start local Supabase (Docker Desktop required)
yarn dev                   # Start Nuxt dev server
yarn supabase db reset     # Apply migrations locally
yarn supabase migration new <name>  # Create new migration
yarn test                  # Run Vitest tests (requires yarn dev running)
yarn playwright install    # First-time setup for e2e tests
yarn lint                  # Run ESLint
yarn type-check           # Run TypeScript checks
```

## Critical Development Notes

- **Path aliases**: `~/` = `app/`, use `~~/` for project root (e.g. `~~/types/`)
- **Route protection**: Always use `middleware: 'admin-auth'` for protected pages
- **Type generation**: Run after any database schema changes
- **Testing isolation**: Tests run with `--no-file-parallelism` due to shared state
- **Image uploads**: Use `useGetPublicURL()` composable for consistent URL handling
- **Form validation**: Leverage Zod schemas from `types/schemas.ts`
- **shadcn-nuxt**: Pinned to 0.10.4 (1.x line) — requires Tailwind v3. Upgrade to 2.x requires Tailwind v4
- **Always run `yarn lint` and `yarn type-check`** before considering tasks complete

## Common Debugging

- **Auth issues**: Check GitHub OAuth callback URLs match environment
- **Type errors**: Regenerate types after DB changes
- **ISR problems**: Verify `routeRules` in `nuxt.config.ts`
- **Test failures**: Ensure dev server running, check browser visibility settings
