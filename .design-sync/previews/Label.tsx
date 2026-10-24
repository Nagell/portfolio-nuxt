import { Label, Input, Checkbox } from 'design-system-mirror';

export const ForInput = () => (
  <div className="grid max-w-sm gap-2">
    <Label htmlFor="url">Company URL</Label>
    <Input id="url" placeholder="Company URL" />
  </div>
);

export const ForCheckbox = () => (
  <div className="flex items-center gap-2">
    <Checkbox id="published" defaultChecked />
    <Label htmlFor="published">Published</Label>
  </div>
);
