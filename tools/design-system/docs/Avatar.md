---
category: Display
---

A person's picture or initials in a circle or rounded square.

- Parts: `Avatar` > `AvatarImage` (`src`, `alt`) + `AvatarFallback` (initials shown while the image loads or if it fails).
- `size`: `sm` 40px (default), `base` 64px, `lg` 128px. `shape`: `circle` (default) or `square`.
- The fill is `secondary`.

```jsx
<Avatar size="base"><AvatarImage src={url} alt="Dawid Nitka" /><AvatarFallback>DN</AvatarFallback></Avatar>
```

React mirror of the site's shadcn-vue `Avatar`; classes copied from `app/components/ui`.
