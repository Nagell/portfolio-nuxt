---
category: Actions
---

A clickable action: the primary call to action in yellow, plus quieter variants.

- `variant`: `default` (yellow `primary`, one per view), `secondary`, `outline`, `ghost` (toolbars, menus), `link`, `destructive` (delete only).
- `size`: `sm` (32px), `default` (36px), `lg` (40px), `icon` (36px square; give it an `aria-label`).
- `asChild` renders the styles on your own element, e.g. an `<a>`.
- Icons go inside as children; they are sized to 16px automatically.

```jsx
<Button>Save project</Button>
<Button variant="outline" size="icon" aria-label="Add"><DawidNitka.Icons.Plus /></Button>
```

React mirror of the site's shadcn-vue `Button`; classes copied from `app/components/ui`.
