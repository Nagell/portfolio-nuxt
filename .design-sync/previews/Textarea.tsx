import { Textarea, Label } from 'design-system-mirror';

export const WithLabel = () => (
  <div className="grid max-w-sm gap-2">
    <Label htmlFor="description">Description</Label>
    <Textarea id="description" placeholder="Experience description" />
  </div>
);

export const Filled = () => (
  <Textarea className="max-w-sm" defaultValue="Led the frontend of a hybrid-rendered portfolio with an admin dashboard." />
);
