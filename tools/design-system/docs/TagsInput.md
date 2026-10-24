---
category: Forms
---

A field that collects a list of free-text tags.

- `value` + `onValueChange` (controlled) or `defaultValue` (uncontrolled), `placeholder`, `disabled`.
- Enter or comma adds the typed tag; Backspace in an empty field removes the last one; each tag has a remove button.
- The tag chips are `secondary` with square-ish 4px corners, unlike the round `Badge`.

```jsx
<TagsInput defaultValue={["Vue", "Nuxt"]} placeholder="Add tags" />
```

React mirror of the site's shadcn-vue `TagsInput`; classes copied from `app/components/ui`.
