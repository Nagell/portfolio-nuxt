---
category: Forms
---

A square on/off control.

- `checked` / `defaultChecked` / `onCheckedChange`; `disabled`.
- Border and checked fill are `primary` (yellow) with a dark check mark. Put a `Label` beside it.

```jsx
<div className="flex items-center gap-2"><Checkbox id="pub" /><Label htmlFor="pub">Published</Label></div>
```

React mirror of the site's shadcn-vue `Checkbox`; classes copied from `app/components/ui`.
