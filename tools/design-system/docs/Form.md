---
category: Forms
---

Form fields wired to react-hook-form with zod validation, labels, descriptions and error messages.

- `useForm`, `zodResolver` and `z` are exported by the bundle too.
- Parts: `Form` (spread the `useForm()` result into it) > `FormField` (`control`, `name`, `render`) > `FormItem` > `FormLabel`, `FormControl` (wraps the input), `FormDescription`, `FormMessage` (shows the field's error).
- On error the label and message turn `destructive`.

```jsx
const form = useForm({ resolver: zodResolver(schema), defaultValues: { title: "" } })
<Form {...form}><form onSubmit={form.handleSubmit(save)}>
  <FormField control={form.control} name="title" render={({ field }) => (
    <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
  )} />
</form></Form>
```

React mirror of the site's shadcn-vue `Form`; classes copied from `app/components/ui`.
