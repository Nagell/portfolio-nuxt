# design-sync notes

The design system is not the Vue site itself: `tools/design-system` is a React port of
`app/components/ui` (shadcn-vue) with the same class strings. Restyle in Vue, port the change
there, then re-sync. See `tools/design-system/README.md`.

## Build

- Run `buildCmd` from the config first: it installs the kit (pnpm) and builds `dist/` (entry +
  `.d.ts`), `out/tokens.css`, `out/bundle.css` and `out/claude-design.css`.
- Converter flags: `--node-modules tools/design-system/node_modules --entry tools/design-system/dist/index.js`.
- Playwright for the render check: 1.61.1, which matches the cached `chromium-1228`. Install it into `.ds-sync/`.

## Gotchas

- `.design-sync/previews/tsconfig.json` must stay: without it esbuild uses the Nuxt root
  tsconfig, compiles preview JSX for Vue and every card renders blank ("Objects are not valid
  as a React child ... __v_isVNode").
- Tokens: the converter only reads `tokensGlob` from a separate tokens package, so tokens ship
  inside `cssEntry` instead (`out/claude-design.css` = `out/tokens.css` + `out/bundle.css`).
  `out/tokens.css` is generated from `app/assets/styles/base/variables.css`.
- Tailwind scans `.design-sync/previews/` (see `design.css` `@source`); a class used only in a
  preview is otherwise missing from the CSS (Skeleton's `h-20` was).
- `componentSrcMap` nulls out the 107 compound parts (`CardHeader`, `TableRow`...) and `Icons` so
  only the 25 top-level components get cards. A new part export needs a null entry or it gets a card.
- Toaster preview uses `position="top-right"`: in the card frame a bottom position anchors to a
  zero-height box and the toast renders above the card.
- `guidelinesGlob` is `[]` because `docs/*.md` are component docs (already bound via `docsDir`),
  not guidelines.

## Known render warns

- None open. The NavigationMenu `[GRID_OVERFLOW]` (its fixed blur strip) is resolved with `cardMode: single`.

## Re-sync risks

- Tokens and fonts are copies made at build time from `app/assets/styles` and `public/fonts`;
  rebuild after changing either.
- The React components drift from the Vue ones silently; run `pnpm drift` in the kit before a re-sync.
- Toaster, Dialog, Sheet, Popover, Tooltip and DropdownMenu previews depend on Radix/Sonner open-state
  props (`defaultOpen`, `onOpenAutoFocus`); a major bump of those packages can change how the cards render.
