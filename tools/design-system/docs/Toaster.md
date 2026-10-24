---
category: Overlays
---

Toast notifications (Sonner): mount one `Toaster`, then call `toast()` anywhere.

- Render `<Toaster />` once near the root; it follows the light/dark theme automatically.
- `toast("Title", { description })`, `toast.success`, `toast.error`, `toast.warning`, `toast.info`, `toast.loading`, `toast.promise`. Lucide icons mark each type.
- Toasts use `background`, `border` and a large shadow; action buttons are `primary`.

```jsx
<Toaster />
<Button onClick={() => toast.success("Project saved")}>Save</Button>
```

React mirror of the site's shadcn-vue `Toaster`; classes copied from `app/components/ui`.
