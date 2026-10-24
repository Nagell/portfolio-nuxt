import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, Button, Icons } from 'design-system-mirror';

export const RowActions = () => (
  <DropdownMenu defaultOpen modal={false}>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" aria-label="Open menu"><Icons.MoreHorizontal /></Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" className="w-48" onOpenAutoFocus={(e) => e.preventDefault()}>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem><Icons.File />Edit<DropdownMenuShortcut>⌘E</DropdownMenuShortcut></DropdownMenuItem>
      <DropdownMenuItem><Icons.ArrowUpRight />Open project</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem><Icons.Trash />Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
