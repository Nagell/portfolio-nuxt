import { Checkbox, Label } from 'design-system-mirror';

export const States = () => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-2"><Checkbox id="home" /><Label htmlFor="home">Show on homepage</Label></div>
    <div className="flex items-center gap-2"><Checkbox id="pub" defaultChecked /><Label htmlFor="pub">Published</Label></div>
    <div className="flex items-center gap-2"><Checkbox id="arch" disabled /><Label htmlFor="arch">Archived</Label></div>
  </div>
);
