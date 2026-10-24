import * as React from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Input, Button, useForm, zodResolver, z } from 'design-system-mirror';

const schema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  url: z.string().url('Enter a valid URL.'),
});

function ExperienceForm({ url, showError }: { url: string; showError?: boolean }) {
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { title: 'Senior Frontend Engineer', url } });
  React.useEffect(() => { if (showError) form.trigger('url'); }, []);
  return (
    <Form {...form}>
      <form className="max-w-sm space-y-6" onSubmit={form.handleSubmit(() => {})}>
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl><Input placeholder="Experience title" {...field} /></FormControl>
            <FormDescription>Shown as the heading of the entry.</FormDescription>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="url" render={({ field }) => (
          <FormItem>
            <FormLabel>Company URL</FormLabel>
            <FormControl><Input placeholder="Company URL" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

export const Valid = () => <ExperienceForm url="https://example.com" />;
export const WithError = () => <ExperienceForm url="example" showError />;
