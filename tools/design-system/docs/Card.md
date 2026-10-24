---
category: Display
---

A bordered surface that groups one item: an experience entry, a project, a form.

- Parts: `Card` > `CardHeader` (`CardTitle`, `CardDescription`) > `CardContent` > `CardFooter`.
- Cards separate from the page by their 1px `border`, not by fill (`card` equals `background`).
- `CardTitle` is 24px semibold; use `CardDescription` for dates and metadata.

```jsx
<Card>
  <CardHeader><CardTitle>Title</CardTitle><CardDescription>2021 – present</CardDescription></CardHeader>
  <CardContent>…</CardContent>
</Card>
```

React mirror of the site's shadcn-vue `Card`; classes copied from `app/components/ui`.
