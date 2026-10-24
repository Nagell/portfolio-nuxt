import { Button, Icons } from 'design-system-mirror';

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Button>Save project</Button>
    <Button variant="secondary">Cancel</Button>
    <Button variant="outline">Preview</Button>
    <Button variant="ghost">Skip</Button>
    <Button variant="link">View Full Résumé</Button>
    <Button variant="destructive"><Icons.Trash />Delete</Button>
  </div>
);

export const Sizes = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Button size="sm">Small</Button>
    <Button>Default</Button>
    <Button size="lg">Large</Button>
    <Button size="icon" variant="outline" aria-label="Add project"><Icons.Plus /></Button>
  </div>
);

export const Disabled = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Button disabled><Icons.Loader2 className="animate-spin" />Saving</Button>
    <Button variant="outline" disabled>Preview</Button>
  </div>
);
