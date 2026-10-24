---
category: Overlays
---

A modal window over a blurred backdrop, for editing or confirming one thing.

- Parts: `Dialog` > `DialogTrigger` (use `asChild` with a `Button`) + `DialogContent` > `DialogHeader` (`DialogTitle`, `DialogDescription`), body, `DialogFooter`.
- The site's dialog has a light 40% black overlay with a small blur and a round, bordered close button at the top right.
- `DialogScrollContent` replaces `DialogContent` for long content: the overlay scrolls instead of the panel.
- Control it with `open` / `onOpenChange` or start it open with `defaultOpen`.

```jsx
<Dialog>
  <DialogTrigger asChild><Button variant="outline">Edit</Button></DialogTrigger>
  <DialogContent><DialogHeader><DialogTitle>Edit experience</DialogTitle></DialogHeader>…</DialogContent>
</Dialog>
```

React mirror of the site's shadcn-vue `Dialog`; classes copied from `app/components/ui`.
