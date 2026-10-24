import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, Icons } from 'design-system-mirror';

export const Search = () => (
  <Command className="max-w-sm rounded-lg border shadow-md">
    <CommandInput placeholder="Search…" />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Sections">
        <CommandItem>About</CommandItem>
        <CommandItem>Experience</CommandItem>
        <CommandItem>Projects</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Admin">
        <CommandItem><Icons.Library className="mr-2 h-4 w-4" />Projects</CommandItem>
        <CommandItem><Icons.Image className="mr-2 h-4 w-4" />Assets</CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
);
