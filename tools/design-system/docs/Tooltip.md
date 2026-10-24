---
category: Overlays
---

A short hint that appears on hover or focus.

- Wrap the app (or the area) once in `TooltipProvider`. Parts: `Tooltip` > `TooltipTrigger` (`asChild`) + `TooltipContent` (`side`).
- Use it to name icon-only buttons; keep the text to a few words.

```jsx
<TooltipProvider><Tooltip>
  <TooltipTrigger asChild><Button size="icon" variant="outline" aria-label="Add project"><DawidNitka.Icons.Plus /></Button></TooltipTrigger>
  <TooltipContent>Add project</TooltipContent>
</Tooltip></TooltipProvider>
```

React mirror of the site's shadcn-vue `Tooltip`; classes copied from `app/components/ui`.
