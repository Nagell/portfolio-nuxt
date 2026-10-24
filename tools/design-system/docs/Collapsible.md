---
category: Navigation
---

A section that expands and collapses with a short height animation.

- Parts: `Collapsible` (`open`/`onOpenChange` or `defaultOpen`) > `CollapsibleTrigger` (`asChild`) + `CollapsibleContent`.

```jsx
<Collapsible>
  <CollapsibleTrigger asChild><Button variant="ghost" size="sm">Show more</Button></CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>
```

React mirror of the site's shadcn-vue `Collapsible`; classes copied from `app/components/ui`.
