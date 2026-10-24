---
category: Overlays
---

A searchable list of commands or results (cmdk).

- Parts: `Command` > `CommandInput` + `CommandList` > `CommandEmpty`, `CommandGroup` (`heading`) > `CommandItem` (`onSelect`), `CommandSeparator`, `CommandShortcut`.
- `CommandDialog` (`open`, `onOpenChange`) shows it as a modal palette.

```jsx
<Command className="rounded-lg border">
  <CommandInput placeholder="Search…" />
  <CommandList><CommandEmpty>No results found.</CommandEmpty><CommandGroup heading="Sections"><CommandItem>About</CommandItem></CommandGroup></CommandList>
</Command>
```

React mirror of the site's shadcn-vue `Command`; classes copied from `app/components/ui`.
