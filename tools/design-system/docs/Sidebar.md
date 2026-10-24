---
category: Navigation
---

The admin dashboard's collapsible side navigation.

- Wrap the page in `SidebarProvider`; put `Sidebar` (`collapsible`: `offcanvas`, `icon` (the admin's choice), `none`; `side`; `variant`) and `SidebarInset` (the main area) inside.
- Inside `Sidebar`: `SidebarHeader`, `SidebarContent` > `SidebarGroup` > `SidebarGroupLabel` + `SidebarMenu` > `SidebarMenuItem` > `SidebarMenuButton` (`asChild`, `isActive`, `tooltip`, `size`), and `SidebarFooter`.
- `SidebarTrigger` toggles it; `useSidebar()` reads its state. Below 768px it becomes a `Sheet`.
- Uses the `sidebar-*` tokens. Admin screens only.

```jsx
<SidebarProvider>
  <Sidebar collapsible="icon"><SidebarContent><SidebarGroup><SidebarMenu>
    <SidebarMenuItem><SidebarMenuButton isActive><DawidNitka.Icons.Library /><span>Projects</span></SidebarMenuButton></SidebarMenuItem>
  </SidebarMenu></SidebarGroup></SidebarContent></Sidebar>
  <SidebarInset>…</SidebarInset>
</SidebarProvider>
```

React mirror of the site's shadcn-vue `Sidebar`; classes copied from `app/components/ui`.
