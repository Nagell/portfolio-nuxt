---
category: Display
---

A data table for admin lists: projects, assets, experience entries.

- Parts: `Table` > `TableHeader` > `TableRow` > `TableHead`; `TableBody` > `TableRow` > `TableCell`; optional `TableFooter`, `TableCaption`.
- `TableEmpty` renders a full-width "No results" row; pass `colSpan` = number of columns.
- Rows highlight on hover; set `data-state="selected"` on a row to mark it selected. The table scrolls horizontally inside its own wrapper.

```jsx
<Table>
  <TableHeader><TableRow><TableHead>Title</TableHead></TableRow></TableHeader>
  <TableBody><TableRow><TableCell>Portfolio site</TableCell></TableRow></TableBody>
</Table>
```

React mirror of the site's shadcn-vue `Table`; classes copied from `app/components/ui`.
