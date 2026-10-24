import { TagsInput, Label } from 'design-system-mirror';

export const WithTags = () => (
  <div className="grid max-w-sm gap-2">
    <Label>Tags</Label>
    <TagsInput defaultValue={['Vue', 'Nuxt', 'TypeScript']} placeholder="Add tags" />
  </div>
);

export const EmptyField = () => (
  <div className="grid max-w-sm gap-2">
    <Label>Tags</Label>
    <TagsInput placeholder="Add tags" />
  </div>
);
