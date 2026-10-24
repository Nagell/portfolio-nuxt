import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, Button, Input, Label } from 'design-system-mirror';

export const EditProject = () => (
  <Sheet defaultOpen>
    <SheetTrigger asChild><Button variant="outline">Open</Button></SheetTrigger>
    <SheetContent onOpenAutoFocus={(e) => e.preventDefault()}>
      <SheetHeader>
        <SheetTitle>Edit project</SheetTitle>
        <SheetDescription>Update the project details.</SheetDescription>
      </SheetHeader>
      <div className="grid gap-2 py-4">
        <Label htmlFor="project">Title</Label>
        <Input id="project" defaultValue="Portfolio site" />
      </div>
      <SheetFooter><Button>Save changes</Button></SheetFooter>
    </SheetContent>
  </Sheet>
);
