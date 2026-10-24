---
category: Display
---

A 1px divider line, horizontal or vertical, with an optional centred label.

- `orientation`: `horizontal` (default) or `vertical` (give the parent a height, e.g. `h-5`).
- `label` puts small muted text on the line, e.g. `"OR"` between two login options.

```jsx
<Separator className="my-4" />
<Separator label="OR" />
```

React mirror of the site's shadcn-vue `Separator`; classes copied from `app/components/ui`.
