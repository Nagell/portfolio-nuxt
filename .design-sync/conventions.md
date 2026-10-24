## Conventions (read first)

Dawid Nitka's portfolio: shadcn components on a warm stone neutral, one yellow brand colour (`primary`), Inter, quiet borders instead of shadows. Components are on `window.DawidNitka`.

### Setup

- No root provider is needed. Link `styles.css` once; it brings the colour tokens, Inter and every component style.
- Dark mode: put `class="dark"` (or `data-theme="dark"`) on `<html>`. Every colour token switches; never hard-code a colour.
- Three components need a wrapper or a mount: wrap tooltips in `TooltipProvider`, render `<Toaster />` once and call `toast()`, and put `Sidebar` inside `SidebarProvider`.
- Compound parts come from the same global: `CardHeader`, `DialogContent`, `TableRow`, `DropdownMenuItem`, and so on. Icons are `DawidNitka.Icons.<Name>` (Lucide: `Plus`, `Trash`, `ArrowUpRight`, `MoreHorizontal`…).

### Styling idiom: Tailwind classes on semantic tokens

Style your own layout with Tailwind utility classes. Only semantic colours exist (no `bg-red-500`, `text-gray-600`):

| Family | Classes |
| --- | --- |
| Surfaces | `bg-background`, `bg-card`, `bg-muted`, `bg-secondary`, `bg-accent`, `bg-primary` |
| Text | `text-foreground`, `text-muted-foreground`, `text-primary-foreground`, `text-destructive` |
| Lines | `border`, `border-border`, `border-input` |
| Opacity | `bg-primary/10`, `bg-muted/50` |
| Type | `text-6xl` page title, `text-4xl` section, `text-2xl`/`text-xl` subheads, all `font-medium tracking-tight`; body `leading-6`; `text-sm`, `text-xs` |
| Layout | `container` (max 1024px, centred), `flex`, `grid grid-cols-3`, `md:col-span-2`, `gap-2`…`gap-6`, `p-*`, `mt-*` |
| Radius | `rounded-sm` 4px, `rounded-md` 6px (controls), `rounded-lg` 8px (cards), `rounded-xl` 12px, `rounded-full` (tags) |

In plain CSS use the tokens directly; they are full colours: `var(--primary)`, `var(--muted-foreground)`, `var(--border)`. Yellow is for one emphasis per view; never yellow text on the light background.

### Where the truth lives

- `_ds_bundle.css`: the token definitions (top of the file, light and `.dark`), then every class the components use.
- `components/<group>/<Name>/<Name>.prompt.md`: usage, parts and variants per component; read it before using one.

### Example

```jsx
const { Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button, Icons } = window.DawidNitka

<section className="container py-16">
  <h1 className="text-6xl font-medium tracking-tight">Dawid Nitka</h1>
  <h2 className="mt-1.5 text-2xl font-medium tracking-tight text-muted-foreground">Senior Frontend Engineer</h2>
  <Card className="mt-6 max-w-md">
    <CardHeader>
      <CardTitle>Portfolio site</CardTitle>
      <CardDescription>Nuxt, Supabase and Tailwind CSS</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-wrap gap-2">
      <Badge variant="muted">Nuxt</Badge>
      <Badge variant="muted">Supabase</Badge>
    </CardContent>
  </Card>
  <Button className="mt-6"><Icons.ArrowUpRight />Open project</Button>
</section>
```
