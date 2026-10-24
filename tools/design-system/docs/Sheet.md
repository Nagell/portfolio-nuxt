---
category: Overlays
---

A panel that slides in from a screen edge, over an 80% black overlay.

- Parts: `Sheet` > `SheetTrigger` + `SheetContent` (`side`: `right` default, `left`, `top`, `bottom`) > `SheetHeader` (`SheetTitle`, `SheetDescription`), body, `SheetFooter`.
- Side panels are 3/4 of the width, up to 384px from `sm` up, and scroll internally.

```jsx
<Sheet>
  <SheetTrigger asChild><Button>Open</Button></SheetTrigger>
  <SheetContent side="right"><SheetHeader><SheetTitle>Edit project</SheetTitle></SheetHeader>…</SheetContent>
</Sheet>
```

React mirror of the site's shadcn-vue `Sheet`; classes copied from `app/components/ui`.
