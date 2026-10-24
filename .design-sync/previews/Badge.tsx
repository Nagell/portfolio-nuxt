import { Badge } from 'design-system-mirror';

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge>Featured</Badge>
    <Badge variant="secondary">Draft</Badge>
    <Badge variant="muted">Muted</Badge>
    <Badge variant="outline">Outline</Badge>
    <Badge variant="destructive">Unpublished</Badge>
  </div>
);

export const TechTags = () => (
  <div className="flex flex-wrap gap-2">
    <Badge variant="muted">Vue</Badge>
    <Badge variant="muted">Nuxt</Badge>
    <Badge variant="muted">TypeScript</Badge>
    <Badge variant="muted">Supabase</Badge>
  </div>
);
