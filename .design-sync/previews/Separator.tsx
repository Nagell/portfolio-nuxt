import { Separator } from 'design-system-mirror';

export const Horizontal = () => (
  <div className="max-w-sm">
    <div className="space-y-1">
      <h4 className="text-sm font-medium leading-none">Dawid Nitka</h4>
      <p className="text-sm text-muted-foreground">Senior Frontend Engineer</p>
    </div>
    <Separator className="my-4" />
    <p className="text-sm">Experience, projects and contact details.</p>
  </div>
);

export const Vertical = () => (
  <div className="flex h-5 items-center gap-x-4 text-sm">
    About<Separator orientation="vertical" />Experience<Separator orientation="vertical" />Projects
  </div>
);

export const Labelled = () => (
  <div className="max-w-sm py-4">
    <Separator label="OR" />
  </div>
);
