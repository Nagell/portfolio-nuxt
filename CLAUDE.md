# Claude Instructions - Portfolio Nuxt

## Architecture Overview

This is a **hybrid Nuxt.js portfolio** with **dual rendering strategies**:

- **Public pages** (`/`, `/legal-notice`, `/privacy-policy`): Use **ISR** (Incremental Static Regeneration) with 1-hour cache
- **Admin dashboard** (`/admin/**`): Uses **SSR** with server-side authentication and CRUD operations

**Core Stack**: Nuxt 3 + Supabase + TypeScript + Shadcn-vue + Tailwind CSS + Vitest

## Key Project Patterns

### Authentication & Routing

- GitHub OAuth via Supabase (`middleware/admin-auth.ts`)
- Admin routes protected by `defineNuxtRouteMiddleware` checking `useSupabaseUser()`
- Redirect flow: unauthenticated → `/login` → `/admin/projects` after auth
- **Important**: Admin routes excluded from sitemap and have `robots: false`

### Data Layer Architecture

```
Frontend ←→ Server API ←→ Supabase
pages/     server/api/    Database Tables:
admin/  ←→ projects/  ←→  - projects
        ←→ experience/ ←→ - experience  
        ←→ assets/    ←→  - storage buckets
```

### Type Safety Flow

1. Database schema → `types/database.types.ts` (auto-generated)
2. Supazod transforms → `types/schemas.ts` (validation schemas)
3. Business types → `types/{projects,experience,files}.types.ts`

**Commands**:

- `yarn types:supabase:local` - Generate from local DB
- `yarn types:supabase` - Generate from production (requires project ID update)

### Component Architecture

- **Shadcn-vue components**: `components/ui/` (don't modify directly)
- **Business components**: `components/{admin,front,common}/`
- **Reusable patterns**: `AddEditFormWrapper.vue` for all CRUD forms
- **Composables**: `useAddEditForm.ts` handles add/edit state management

### Testing Strategy

- **E2E tests**: Vitest + Playwright (`pages/__tests__/*.e2e.test.ts`)
- **Test configuration**: `pages/__tests__/helpers/vitestConfig.ts`
- **Test IDs**: Centralized in `utils/testIds.ts`
- **Browser control**: Set `IS_BROWSER_VISIBLE = true` for debugging

## Development Workflow

### Essential Commands

```bash
# Setup (Docker Desktop required)
yarn supabase start        # Start local Supabase
yarn dev                   # Start Nuxt dev server

# Database workflow  
yarn supabase db reset     # Apply migrations locally
yarn supabase migration new <name>  # Create new migration

# Testing
yarn test                  # Run Vitest tests (requires yarn dev running)
yarn playwright install    # First-time setup for e2e tests

# Code Quality
yarn lint                  # Run ESLint
yarn type-check           # Run TypeScript checks
```

### Environment Setup

1. **Local development**: Requires `.env` with local Supabase credentials
2. **Testing**: Requires `.env.test` (copy of `.env`)
3. **GitHub OAuth**: Separate OAuth apps for dev (`localhost:3000`) and prod

### File Organization Rules

- **Server API**: `server/api/{resource}/` with REST conventions
- **Pages**: Auto-routed, protected routes use `admin-auth` middleware  
- **Components**: Grouped by domain (`admin/`, `front/`, `common/`)
- **Assets**: Managed via Supabase storage, optimized with `@nuxt/image`

## Integration Points

### Supabase Integration

- **Client**: `useSupabaseClient()` for authenticated requests
- **Server**: `serverSupabaseClient(event)` in API routes
- **Auth**: `useSupabaseUser()` reactive user state
- **Admin panel**: Available at `http://127.0.0.1:54323`

### Image Handling

- **Storage**: Supabase buckets configured in `supabase/buckets/`
- **Optimization**: `@nuxt/image` with WebP/JPEG formats
- **Upload flow**: Admin upload → Supabase storage → optimized delivery

### Build & Deployment

- **ISR pages**: Pre-rendered with 1-hour revalidation
- **Admin pages**: Server-rendered on demand
- **Assets**: Auto-optimized and served from CDN

## Critical Development Notes

- **Route protection**: Always use `middleware: 'admin-auth'` for protected pages
- **Type generation**: Run after any database schema changes
- **Testing isolation**: Tests run with `--no-file-parallelism` due to shared state
- **Image uploads**: Use `useGetPublicURL()` composable for consistent URL handling
- **Form validation**: Leverage Zod schemas from `types/schemas.ts`

## Code Quality Standards

- **Always run linting and type checking** before considering tasks complete
- **Follow Vue 3 Composition API patterns** for all new components
- **Use TypeScript** for all new files
- **Maintain type safety** throughout the application
- **Test critical functionality** with E2E tests when making significant changes

## Common Debugging

- **Auth issues**: Check GitHub OAuth callback URLs match environment
- **Type errors**: Regenerate types after DB changes
- **ISR problems**: Verify `routeRules` in `nuxt.config.ts`
- **Test failures**: Ensure dev server running, check browser visibility settings
