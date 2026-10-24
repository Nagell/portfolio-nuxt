import { Popover, PopoverTrigger, PopoverContent, Button, Input, Label } from 'design-system-mirror';

export const Filter = () => (
  <Popover defaultOpen>
    <PopoverTrigger asChild><Button variant="outline">Filter</Button></PopoverTrigger>
    <PopoverContent align="start" onOpenAutoFocus={(e) => e.preventDefault()}>
      <div className="grid gap-3">
        <div className="space-y-1">
          <h4 className="font-medium leading-none">Filter projects</h4>
          <p className="text-sm text-muted-foreground">Show projects with these tags.</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="tag">Tag</Label>
          <Input id="tag" defaultValue="Nuxt" />
        </div>
      </div>
    </PopoverContent>
  </Popover>
);
