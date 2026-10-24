---
category: Overlays
---

A menu of actions that opens from a button.

- Parts: `DropdownMenu` > `DropdownMenuTrigger` (`asChild`) + `DropdownMenuContent` > `DropdownMenuLabel`, `DropdownMenuItem` (icons as first child, `onSelect`), `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`/`RadioItem`, `DropdownMenuSub`/`SubTrigger`/`SubContent`.
- The site uses it for row actions (a ghost icon button with `Icons.MoreHorizontal`) and the sidebar's account menu.

```jsx
<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" aria-label="Actions"><DawidNitka.Icons.MoreHorizontal /></Button></DropdownMenuTrigger>
  <DropdownMenuContent><DropdownMenuItem><DawidNitka.Icons.Trash />Delete</DropdownMenuItem></DropdownMenuContent>
</DropdownMenu>
```

React mirror of the site's shadcn-vue `DropdownMenu`; classes copied from `app/components/ui`.
