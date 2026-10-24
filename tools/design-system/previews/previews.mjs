// Preview card sources. Each entry: group, height, subtitle, and `body` = the body of a
// function App() that returns React elements (h = React.createElement, D = window.DawidNitka).
// Content is example data modelled on the portfolio site and its admin.
export const previews = {
  Button: { group: "Actions", height: 150, subtitle: "6 variants, 4 sizes", body: `
    const { Button, Icons } = D
    return h("div", { className: "flex flex-col gap-4 p-6" },
      h("div", { className: "flex flex-wrap items-center gap-2" },
        h(Button, null, "Save project"),
        h(Button, { variant: "secondary" }, "Cancel"),
        h(Button, { variant: "outline" }, "Preview"),
        h(Button, { variant: "ghost" }, "Skip"),
        h(Button, { variant: "link" }, "View Full Résumé"),
        h(Button, { variant: "destructive" }, h(Icons.Trash), "Delete")),
      h("div", { className: "flex flex-wrap items-center gap-2" },
        h(Button, { size: "sm" }, "Small"),
        h(Button, null, "Default"),
        h(Button, { size: "lg" }, "Large"),
        h(Button, { size: "icon", variant: "outline", "aria-label": "Add" }, h(Icons.Plus)),
        h(Button, { disabled: true }, h(Icons.Loader2, { className: "animate-spin" }), "Saving")))` },

  Badge: { group: "Display", height: 80, subtitle: "default / secondary / muted / outline / destructive", body: `
    const { Badge } = D
    return h("div", { className: "flex flex-wrap items-center gap-2 p-6" },
      h(Badge, null, "Featured"),
      h(Badge, { variant: "secondary" }, "Draft"),
      h(Badge, { variant: "muted" }, "Vue"),
      h(Badge, { variant: "muted" }, "Nuxt"),
      h(Badge, { variant: "muted" }, "TypeScript"),
      h(Badge, { variant: "outline" }, "Outline"),
      h(Badge, { variant: "destructive" }, "Unpublished"))` },

  Avatar: { group: "Display", height: 170, subtitle: "sm / base / lg, circle and square", body: `
    const { Avatar, AvatarFallback } = D
    return h("div", { className: "flex flex-wrap items-end gap-4 p-6" },
      h(Avatar, null, h(AvatarFallback, null, "DN")),
      h(Avatar, { size: "base" }, h(AvatarFallback, null, "DN")),
      h(Avatar, { size: "lg" }, h(AvatarFallback, null, "DN")),
      h(Avatar, { size: "base", shape: "square" }, h(AvatarFallback, null, "DN")))` },

  Card: { group: "Display", height: 260, subtitle: "Header, content, footer", body: `
    const { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge } = D
    return h("div", { className: "p-6" },
      h(Card, { className: "max-w-md" },
        h(CardHeader, null,
          h(CardTitle, null, "Senior Frontend Engineer"),
          h(CardDescription, null, "Example company · 2021 – present")),
        h(CardContent, null, h("p", { className: "text-sm leading-6" },
          "Building scalable, user-focused web applications that balance elegant design with robust technology.")),
        h(CardFooter, { className: "flex flex-wrap gap-2" },
          h(Badge, { variant: "muted" }, "Vue"), h(Badge, { variant: "muted" }, "Nuxt"), h(Badge, { variant: "muted" }, "TypeScript"))))` },

  Carousel: { group: "Display", height: 230, subtitle: "Horizontal, with previous/next", body: `
    const { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, Card, CardContent } = D
    return h("div", { className: "px-16 py-6" },
      h(Carousel, { className: "w-full max-w-sm", opts: { align: "start" } },
        h(CarouselContent, null, [1, 2, 3, 4, 5].map((n) =>
          h(CarouselItem, { key: n, className: "basis-1/2" },
            h(Card, null, h(CardContent, { className: "flex aspect-square items-center justify-center p-6" },
              h("span", { className: "text-3xl font-semibold" }, n)))))),
        h(CarouselPrevious), h(CarouselNext)))` },

  Separator: { group: "Display", height: 170, subtitle: "Horizontal, vertical, labelled", body: `
    const { Separator } = D
    return h("div", { className: "p-6 max-w-sm" },
      h("div", { className: "space-y-1" },
        h("h4", { className: "text-sm font-medium leading-none" }, "Dawid Nitka"),
        h("p", { className: "text-sm text-muted-foreground" }, "Senior Frontend Engineer")),
      h(Separator, { className: "my-4" }),
      h("div", { className: "flex h-5 items-center gap-x-4 text-sm" },
        "About", h(Separator, { orientation: "vertical" }), "Experience", h(Separator, { orientation: "vertical" }), "Projects"),
      h(Separator, { className: "my-6", label: "OR" }))` },

  Skeleton: { group: "Display", height: 110, subtitle: "Loading placeholder", body: `
    const { Skeleton } = D
    return h("div", { className: "flex items-center gap-4 p-6" },
      h(Skeleton, { className: "h-12 w-12 rounded-full" }),
      h("div", { className: "space-y-2" }, h(Skeleton, { className: "h-4 w-60" }), h(Skeleton, { className: "h-4 w-44" })))` },

  Table: { group: "Display", height: 300, subtitle: "Header, rows, caption", body: `
    const { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption, Badge, Button, Icons } = D
    const rows = [["Portfolio site", ["Nuxt", "Supabase"], "Yes"], ["Design system", ["Vue", "Tailwind"], "Yes"], ["Admin dashboard", ["TypeScript"], "No"]]
    return h("div", { className: "p-6" },
      h(Table, null,
        h(TableCaption, null, "Example projects."),
        h(TableHeader, null, h(TableRow, null,
          h(TableHead, null, "Title"), h(TableHead, null, "Tags"), h(TableHead, null, "Published"), h(TableHead, { className: "w-12" }))),
        h(TableBody, null, rows.map(([t, tags, p]) => h(TableRow, { key: t },
          h(TableCell, { className: "font-medium" }, t),
          h(TableCell, null, h("div", { className: "flex gap-1" }, tags.map((x) => h(Badge, { key: x, variant: "muted" }, x)))),
          h(TableCell, null, p),
          h(TableCell, null, h(Button, { variant: "ghost", size: "icon", "aria-label": "Actions" }, h(Icons.MoreHorizontal))))))))` },

  Input: { group: "Forms", height: 190, subtitle: "Default, filled, disabled", body: `
    const { Input, Label } = D
    return h("div", { className: "grid max-w-sm gap-4 p-6" },
      h("div", { className: "grid gap-2" }, h(Label, { htmlFor: "t" }, "Title"), h(Input, { id: "t", placeholder: "Experience title" })),
      h(Input, { defaultValue: "https://example.com" }),
      h(Input, { disabled: true, placeholder: "Disabled" }))` },

  Textarea: { group: "Forms", height: 160, subtitle: "Multi-line text", body: `
    const { Textarea, Label } = D
    return h("div", { className: "grid max-w-sm gap-2 p-6" },
      h(Label, { htmlFor: "d" }, "Description"),
      h(Textarea, { id: "d", placeholder: "Experience description" }))` },

  Label: { group: "Forms", height: 110, subtitle: "Field labels", body: `
    const { Label, Input } = D
    return h("div", { className: "grid max-w-sm gap-2 p-6" },
      h(Label, { htmlFor: "u" }, "Company URL"),
      h(Input, { id: "u", placeholder: "Company URL" }))` },

  Checkbox: { group: "Forms", height: 110, subtitle: "Unchecked, checked, disabled", body: `
    const { Checkbox, Label } = D
    return h("div", { className: "flex flex-col gap-3 p-6" },
      h("div", { className: "flex items-center gap-2" }, h(Checkbox, { id: "a" }), h(Label, { htmlFor: "a" }, "Show on homepage")),
      h("div", { className: "flex items-center gap-2" }, h(Checkbox, { id: "b", defaultChecked: true }), h(Label, { htmlFor: "b" }, "Published")),
      h("div", { className: "flex items-center gap-2" }, h(Checkbox, { id: "c", disabled: true }), h(Label, { htmlFor: "c" }, "Archived")))` },

  TagsInput: { group: "Forms", height: 110, subtitle: "Enter to add, Backspace to remove", body: `
    const { TagsInput, Label } = D
    return h("div", { className: "grid max-w-sm gap-2 p-6" },
      h(Label, null, "Tags"),
      h(TagsInput, { defaultValue: ["Vue", "Nuxt", "TypeScript"], placeholder: "Add tags" }))` },

  Calendar: { group: "Forms", height: 340, subtitle: "Single date", body: `
    const { Calendar } = D
    const [date, setDate] = React.useState(new Date(2026, 9, 14))
    return h("div", { className: "p-6" },
      h(Calendar, { mode: "single", selected: date, onSelect: setDate, defaultMonth: new Date(2026, 9, 1), className: "w-fit rounded-md border" }))` },

  Form: { group: "Forms", height: 300, subtitle: "react-hook-form + zod, with validation message", body: `
    const { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Input, Button, useForm, zodResolver, z } = D
    const schema = z.object({ title: z.string().min(2, "Title must be at least 2 characters."), url: z.string().url("Enter a valid URL.") })
    const form = useForm({ resolver: zodResolver(schema), defaultValues: { title: "Senior Frontend Engineer", url: "example" } })
    React.useEffect(() => { form.trigger("url") }, [])
    return h(Form, form, h("form", { className: "max-w-sm space-y-6 p-6", onSubmit: form.handleSubmit(() => {}) },
      h(FormField, { control: form.control, name: "title", render: ({ field }) => h(FormItem, null,
        h(FormLabel, null, "Title"), h(FormControl, null, h(Input, Object.assign({ placeholder: "Experience title" }, field))),
        h(FormDescription, null, "Shown as the heading of the entry."), h(FormMessage)) }),
      h(FormField, { control: form.control, name: "url", render: ({ field }) => h(FormItem, null,
        h(FormLabel, null, "Company URL"), h(FormControl, null, h(Input, Object.assign({ placeholder: "Company URL" }, field))), h(FormMessage)) }),
      h(Button, { type: "submit" }, "Save")))` },

  Dialog: { group: "Overlays", height: 340, subtitle: "Open state: blurred overlay, round close button", body: `
    const { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Button, Input, Label } = D
    return h(Dialog, { defaultOpen: true },
      h("div", { className: "p-6" }, h(DialogTrigger, { asChild: true }, h(Button, { variant: "outline" }, "Edit experience"))),
      h(DialogContent, { className: "max-w-md", onOpenAutoFocus: (e) => e.preventDefault() },
        h(DialogHeader, null, h(DialogTitle, null, "Edit experience"), h(DialogDescription, null, "Changes appear on the homepage after saving.")),
        h("div", { className: "grid gap-2" }, h(Label, { htmlFor: "x" }, "Title"), h(Input, { id: "x", defaultValue: "Senior Frontend Engineer" })),
        h(DialogFooter, null, h(Button, { variant: "outline" }, "Cancel"), h(Button, null, "Save"))))` },

  Sheet: { group: "Overlays", height: 400, subtitle: "Right side panel, open", body: `
    const { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, Button, Input, Label } = D
    return h(Sheet, { defaultOpen: true },
      h("div", { className: "p-6" }, h(SheetTrigger, { asChild: true }, h(Button, { variant: "outline" }, "Open"))),
      h(SheetContent, { onOpenAutoFocus: (e) => e.preventDefault() },
        h(SheetHeader, null, h(SheetTitle, null, "Edit project"), h(SheetDescription, null, "Update the project details.")),
        h("div", { className: "grid gap-2 py-4" }, h(Label, { htmlFor: "p" }, "Title"), h(Input, { id: "p", defaultValue: "Portfolio site" })),
        h(SheetFooter, null, h(Button, null, "Save changes"))))` },

  Popover: { group: "Overlays", height: 240, subtitle: "Open state", body: `
    const { Popover, PopoverTrigger, PopoverContent, Button, Input, Label } = D
    return h("div", { className: "p-6" }, h(Popover, { defaultOpen: true },
      h(PopoverTrigger, { asChild: true }, h(Button, { variant: "outline" }, "Filter")),
      h(PopoverContent, { align: "start", onOpenAutoFocus: (e) => e.preventDefault() },
        h("div", { className: "grid gap-3" },
          h("div", { className: "space-y-1" }, h("h4", { className: "font-medium leading-none" }, "Filter projects"), h("p", { className: "text-sm text-muted-foreground" }, "Show projects with these tags.")),
          h("div", { className: "grid gap-2" }, h(Label, { htmlFor: "f" }, "Tag"), h(Input, { id: "f", defaultValue: "Nuxt" }))))))` },

  Tooltip: { group: "Overlays", height: 120, subtitle: "Open state", body: `
    const { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button, Icons } = D
    return h(TooltipProvider, null, h("div", { className: "p-6 pt-14" }, h(Tooltip, { defaultOpen: true },
      h(TooltipTrigger, { asChild: true }, h(Button, { variant: "outline", size: "icon", "aria-label": "Add project" }, h(Icons.Plus))),
      h(TooltipContent, { side: "right" }, "Add project"))))` },

  DropdownMenu: { group: "Overlays", height: 230, subtitle: "Open state with label, icons, shortcut", body: `
    const { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, Button, Icons } = D
    return h("div", { className: "p-6" }, h(DropdownMenu, { defaultOpen: true, modal: false },
      h(DropdownMenuTrigger, { asChild: true }, h(Button, { variant: "ghost", size: "icon", "aria-label": "Open menu" }, h(Icons.MoreHorizontal))),
      h(DropdownMenuContent, { align: "start", className: "w-48", onOpenAutoFocus: (e) => e.preventDefault() },
        h(DropdownMenuLabel, null, "Actions"),
        h(DropdownMenuItem, null, h(Icons.File), "Edit", h(DropdownMenuShortcut, null, "⌘E")),
        h(DropdownMenuItem, null, h(Icons.ArrowUpRight), "Open project"),
        h(DropdownMenuSeparator),
        h(DropdownMenuItem, null, h(Icons.Trash), "Delete"))))` },

  Command: { group: "Overlays", height: 320, subtitle: "Search with grouped results", body: `
    const { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, Icons } = D
    return h("div", { className: "p-6" }, h(Command, { className: "max-w-sm rounded-lg border shadow-md" },
      h(CommandInput, { placeholder: "Search…" }),
      h(CommandList, null,
        h(CommandEmpty, null, "No results found."),
        h(CommandGroup, { heading: "Sections" }, h(CommandItem, null, "About"), h(CommandItem, null, "Experience"), h(CommandItem, null, "Projects")),
        h(CommandSeparator),
        h(CommandGroup, { heading: "Admin" },
          h(CommandItem, null, h(Icons.Library, { className: "mr-2 h-4 w-4" }), "Projects"),
          h(CommandItem, null, h(Icons.Image, { className: "mr-2 h-4 w-4" }), "Assets")))))` },

  Toaster: { group: "Overlays", height: 200, subtitle: "Sonner toasts", body: `
    const { Toaster, toast, Button } = D
    React.useEffect(() => { toast.success("Project saved", { description: "It is now live on the homepage.", duration: Infinity }) }, [])
    return h("div", { className: "p-6" },
      h(Button, { variant: "outline", onClick: () => toast("Experience updated", { description: "Example toast." }) }, "Show toast"),
      h(Toaster, { position: "bottom-right" }))` },

  Collapsible: { group: "Navigation", height: 200, subtitle: "Open state", body: `
    const { Collapsible, CollapsibleTrigger, CollapsibleContent, Button, Icons } = D
    return h("div", { className: "p-6" }, h(Collapsible, { defaultOpen: true, className: "max-w-sm space-y-2" },
      h("div", { className: "flex items-center justify-between" },
        h("h4", { className: "text-sm font-semibold" }, "Tech stack"),
        h(CollapsibleTrigger, { asChild: true }, h(Button, { variant: "ghost", size: "sm", "aria-label": "Toggle" }, h(Icons.ChevronsUpDown)))),
      h("div", { className: "rounded-md border px-4 py-2 text-sm" }, "Nuxt"),
      h(CollapsibleContent, { className: "space-y-2" },
        h("div", { className: "rounded-md border px-4 py-2 text-sm" }, "Supabase"),
        h("div", { className: "rounded-md border px-4 py-2 text-sm" }, "Tailwind CSS"))))` },

  NavigationMenu: { group: "Navigation", height: 110, subtitle: "The site header: floating, blurred, logo + section links", body: `
    const { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } = D
    const link = (name, extra) => h(NavigationMenuItem, { key: name },
      h(NavigationMenuLink, { asChild: true }, h("a", { href: "#" + name.toLowerCase(), className: D.cn(navigationMenuTriggerStyle(), extra) }, name)))
    return h(NavigationMenu, null,
      h(NavigationMenuList, null,
        h(NavigationMenuItem, null, h("a", { href: "#", className: "px-2 py-3 block", "aria-label": "Navigate to the homepage" },
          h("img", { src: "/_blob/ad6e81b0d495ffd4f3809694cb838ad4", alt: "", className: "w-6 h-6 dark:hidden" }),
          h("img", { src: "/_blob/c6d84875482963718223e75e5a8d2e63", alt: "", className: "w-6 h-6 hidden dark:block" }))),
        ["About", "Experience", "Projects"].map((n) => link(n))),
      h(NavigationMenuList, { className: "hidden xs:flex" }, link("Login", "pr-3")))` },

  Sidebar: { group: "Navigation", height: 300, subtitle: "The admin sidebar", body: `
    const { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset, Avatar, AvatarFallback, Icons } = D
    const items = [["Projects", Icons.Library], ["Assets", Icons.Image], ["Experience", Icons.CircleArrowUp]]
    return h(SidebarProvider, { style: { minHeight: "300px" } },
      h(Sidebar, { collapsible: "none", className: "border-r" },
        h(SidebarHeader, null, h(SidebarMenu, null, h(SidebarMenuItem, null,
          h("div", { className: "flex items-center p-2" },
            h("div", { className: "flex aspect-square size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground" }, h(Icons.SlidersHorizontal, { className: "size-4" })),
            h("div", { className: "grid flex-1 text-left text-lg leading-tight pl-2" }, h("span", { className: "truncate font-semibold" }, "Dashboard")))))),
        h(SidebarContent, null, h(SidebarGroup, null,
          h(SidebarGroupLabel, null, "Content"),
          h(SidebarMenu, null, items.map(([t, I], i) => h(SidebarMenuItem, { key: t },
            h(SidebarMenuButton, { asChild: true, isActive: i === 0 }, h("a", { href: "#" }, h(I), h("span", null, t)))))))),
        h(SidebarFooter, null, h(SidebarMenu, null, h(SidebarMenuItem, null,
          h(SidebarMenuButton, { size: "lg" },
            h(Avatar, { className: "h-8 w-8 rounded-lg" }, h(AvatarFallback, { className: "rounded-lg" }, "D")),
            h("div", { className: "grid flex-1 text-left text-sm leading-tight" },
              h("span", { className: "truncate font-semibold" }, "Dawid"), h("span", { className: "truncate text-xs" }, "dawid@example.com")),
            h(Icons.ChevronsUpDown, { className: "ml-auto size-4" })))))),
      h(SidebarInset, null, h("div", { className: "p-6" }, h("h2", { className: "text-2xl font-medium tracking-tight" }, "Projects"))))` },
}
