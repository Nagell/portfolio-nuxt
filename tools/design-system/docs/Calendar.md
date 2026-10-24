---
category: Forms
---

A month grid for picking a date (react-day-picker v9).

- `mode="single"` with `selected` + `onSelect`; also `mode="range"` / `"multiple"`. `defaultMonth` sets the visible month.
- Selected day is filled `primary`; today is tinted `accent`. Put it inside a `Popover` for a date field, or give it `className="rounded-md border"` inline.

```jsx
const [date, setDate] = React.useState(new Date())
<Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
```

React mirror of the site's shadcn-vue `Calendar`; classes copied from `app/components/ui`.
