import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Button, Input, Label } from 'design-system-mirror';

export const EditExperience = () => (
  <Dialog defaultOpen>
    <DialogTrigger asChild><Button variant="outline">Edit experience</Button></DialogTrigger>
    <DialogContent className="max-w-md" onOpenAutoFocus={(e) => e.preventDefault()}>
      <DialogHeader>
        <DialogTitle>Edit experience</DialogTitle>
        <DialogDescription>Changes appear on the homepage after saving.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" defaultValue="Senior Frontend Engineer" />
      </div>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
