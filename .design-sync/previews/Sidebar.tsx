import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset, Avatar, AvatarFallback, Icons } from 'design-system-mirror';

const items = [
  { title: 'Projects', icon: Icons.Library },
  { title: 'Assets', icon: Icons.Image },
  { title: 'Experience', icon: Icons.CircleArrowUp },
];

export const AdminSidebar = () => (
  <SidebarProvider style={{ minHeight: '320px' }}>
    <Sidebar collapsible="none" className="border-r">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center p-2">
              <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Icons.SlidersHorizontal className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-lg leading-tight pl-2"><span className="truncate font-semibold">Dashboard</span></div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarMenu>
            {items.map((item, i) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={i === 0}>
                  <a href="#"><item.icon /><span>{item.title}</span></a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Avatar className="h-8 w-8 rounded-lg"><AvatarFallback className="rounded-lg">D</AvatarFallback></Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Dawid</span>
                <span className="truncate text-xs">dawid@example.com</span>
              </div>
              <Icons.ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
    <SidebarInset>
      <div className="p-6"><h2 className="text-2xl font-medium tracking-tight">Projects</h2></div>
    </SidebarInset>
  </SidebarProvider>
);
