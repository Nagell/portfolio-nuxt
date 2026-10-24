---
category: Forms
---

A single-line text field.

- Takes every native `<input>` prop (`type`, `placeholder`, `value`, `onChange`, `disabled`).
- 40px tall, `input` border, `ring` focus ring. Pair it with a `Label` (`htmlFor` = the input's `id`), or use it inside `Form`.

```jsx
<Label htmlFor="title">Title</Label>
<Input id="title" placeholder="Experience title" />
```

React mirror of the site's shadcn-vue `Input`; classes copied from `app/components/ui`.
