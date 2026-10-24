import { Collapsible, CollapsibleTrigger, CollapsibleContent, Button, Icons } from 'design-system-mirror';

const Stack = ({ open }: { open: boolean }) => (
  <Collapsible defaultOpen={open} className="max-w-sm space-y-2">
    <div className="flex items-center justify-between">
      <h4 className="text-sm font-semibold">Tech stack</h4>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="sm" aria-label="Toggle"><Icons.ChevronsUpDown /></Button>
      </CollapsibleTrigger>
    </div>
    <div className="rounded-md border px-4 py-2 text-sm">Nuxt</div>
    <CollapsibleContent className="space-y-2">
      <div className="rounded-md border px-4 py-2 text-sm">Supabase</div>
      <div className="rounded-md border px-4 py-2 text-sm">Tailwind CSS</div>
    </CollapsibleContent>
  </Collapsible>
);

export const Open = () => <Stack open />;
export const Closed = () => <Stack open={false} />;
