import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption, TableEmpty, Badge, Button, Icons } from 'design-system-mirror';

const rows: [string, string[], string][] = [
  ['Portfolio site', ['Nuxt', 'Supabase'], 'Yes'],
  ['Design system', ['Vue', 'Tailwind'], 'Yes'],
  ['Admin dashboard', ['TypeScript'], 'No'],
];

const Head = () => (
  <TableHeader>
    <TableRow>
      <TableHead>Title</TableHead>
      <TableHead>Tags</TableHead>
      <TableHead>Published</TableHead>
      <TableHead className="w-12" />
    </TableRow>
  </TableHeader>
);

export const Projects = () => (
  <Table>
    <TableCaption>Example projects.</TableCaption>
    <Head />
    <TableBody>
      {rows.map(([title, tags, published]) => (
        <TableRow key={title}>
          <TableCell className="font-medium">{title}</TableCell>
          <TableCell><div className="flex gap-1">{tags.map((t) => <Badge key={t} variant="muted">{t}</Badge>)}</div></TableCell>
          <TableCell>{published}</TableCell>
          <TableCell><Button variant="ghost" size="icon" aria-label="Actions"><Icons.MoreHorizontal /></Button></TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const Empty = () => (
  <Table>
    <Head />
    <TableBody>
      <TableEmpty colSpan={4}>No results.</TableEmpty>
    </TableBody>
  </Table>
);
