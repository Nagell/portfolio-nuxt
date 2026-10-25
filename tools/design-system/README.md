# Design system mirror

Builds the [Dawid Nitka Portfolio](https://claude.ai/artifact/9urYRk6uThVmDUMQn3jXtv) design system's components: a React port of `app/components/ui` (shadcn-vue), so Claude Design can render them. The site never imports anything from here.

Each `src/ui/*.tsx` starts from the React shadcn/ui "default" style, with its Tailwind classes replaced by the exact class strings of the matching Vue component. Change a Vue component's styling, then copy the change here and rebuild.

This folder is its own pnpm project (not a workspace member, with its own `pnpm-lock.yaml`) and is excluded from the repo's ESLint and Nuxt typecheck.

## Rebuild

```bash
cd tools/design-system
pnpm install --frozen-lockfile
pnpm drift                 # classes that differ between Vue and React, per component
pnpm build                 # out/bundle.js (window.DawidNitka) + out/bundle.css
```

## Publish (`/design-sync`)

Run `/design-sync` in Claude Code from the repo root. It reads `.design-sync/config.json` (project, build command, CSS and docs paths), the preview cards in `.design-sync/previews/` and the quirks in `.design-sync/NOTES.md`, rebuilds, re-checks only the components that changed, and uploads them to the "Dawid Nitka Portfolio" project in Claude Design. `pnpm build:dist` produces the package form it needs (`dist/` with types, `out/tokens.css` from the site's `variables.css`); `docs/*.md` are the per-component guides.

While Claude Design moves into the Claude app, the sync still lands in the standalone Claude Design project. To bring a sync over to the design system in the Claude app, open **Design** in the Claude app and choose **Move again**.

## Files

| Path | What |
| --- | --- |
| `src/ui/` | The 25 components. `tags-input.tsx` is hand-written (no React shadcn version); `calendar.tsx` restyles react-day-picker v9 to match the reka-ui calendar. |
| `src/index.ts`, `src/icons.ts` | Bundle exports, including `useForm`/`zodResolver`/`z` and the Lucide icons the site uses. |
| `design.css` | Tailwind v4 input. Colours point at the system's tokens (`var(--primary)`…), so `tokens.css` stays the single source; mirrors `app/assets/styles`. |
| `build.mjs` | esbuild IIFE that reads React 18 from `window.React`/`window.ReactDOM`. |
| `build-dist.mjs`, `fonts.css`, `docs/` | Package form, Inter and component guides for `/design-sync`. |
| `previews/previews.mjs`, `gen.mjs`, `dts.mjs`, `readmes.py` | Left from the first, hand-published version of the design system; `/design-sync` doesn't use them. Tailwind still scans `previews.mjs` for classes, so check the CSS before removing it. |
| `classdiff.mjs` | Vue-vs-React class drift report. |
