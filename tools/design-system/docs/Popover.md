---
category: Overlays
---

A small floating panel anchored to a trigger, for filters and pickers.

- Parts: `Popover` > `PopoverTrigger` (`asChild`) + `PopoverContent` (`align`, `side`, `sideOffset`; 288px wide by default).

```jsx
<Popover>
  <PopoverTrigger asChild><Button variant="outline">Filter</Button></PopoverTrigger>
  <PopoverContent>…</PopoverContent>
</Popover>
```

React mirror of the site's shadcn-vue `Popover`; classes copied from `app/components/ui`.
