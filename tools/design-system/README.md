# Design system mirror

Builds the [Dawid Nitka Portfolio](https://claude.ai/artifact/YFMLUApDALJbHz9sa9kASU) design system's components: a React port of `app/components/ui` (shadcn-vue), so Claude Design can render them. The site never imports anything from here.

Each `src/ui/*.tsx` starts from the React shadcn/ui "default" style, with its Tailwind classes replaced by the exact class strings of the matching Vue component. Change a Vue component's styling, then copy the change here and rebuild.

This folder uses npm (its own `package-lock.json`) and is excluded from the repo's ESLint and Nuxt typecheck.

## Rebuild

```bash
cd tools/design-system
npm ci
npm run drift            # classes that differ between Vue and React, per component
npm run build            # out/bundle.js (window.DawidNitka) + out/bundle.css
```

To publish, read the system's files into a folder (`<dir>/project/…`) with the Artifact tool, then:

```bash
cp out/bundle.js out/bundle.css <dir>/project/components/
npm run previews -- <dir>/project   # components/<Name>/preview.html + harness/ pages for screenshots
npm run dts -- <dir>/project        # components/index.d.ts
python3 readmes.py <dir>/project    # components/<Name>/README.md
```

Serve the scratch root over HTTP and open `harness/<Name>.light.html` / `.dark.html` to check each card before publishing. Publish the changed files to the system's URL as its `SKILL.md` describes, with `components/index.d.ts` sent as `text/plain`.

## Files

| Path | What |
| --- | --- |
| `src/ui/` | The 25 components. `tags-input.tsx` is hand-written (no React shadcn version); `calendar.tsx` restyles react-day-picker v9 to match the reka-ui calendar. |
| `src/index.ts`, `src/icons.ts` | Bundle exports, including `useForm`/`zodResolver`/`z` and the Lucide icons the site uses. |
| `design.css` | Tailwind v4 input. Colours point at the system's tokens (`var(--primary)`…), so `tokens.css` stays the single source; mirrors `app/assets/styles`. |
| `build.mjs` | esbuild IIFE that reads React 18 from `window.React`/`window.ReactDOM`. |
| `previews/previews.mjs` | Preview card content. The logo `src`s are the system's uploaded asset ids. |
| `gen.mjs`, `dts.mjs`, `readmes.py` | Generate previews and harness pages, `index.d.ts`, component READMEs. |
| `classdiff.mjs` | Vue-vs-React class drift report. |
