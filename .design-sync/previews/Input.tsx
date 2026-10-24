import { Input, Label } from 'design-system-mirror';

export const WithLabel = () => (
  <div className="grid max-w-sm gap-2">
    <Label htmlFor="title">Title</Label>
    <Input id="title" placeholder="Experience title" />
  </div>
);

export const Filled = () => <Input className="max-w-sm" defaultValue="https://example.com" />;

export const Disabled = () => <Input className="max-w-sm" disabled placeholder="Disabled" />;
