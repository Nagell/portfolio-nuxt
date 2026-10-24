import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Button, Icons } from 'design-system-mirror';

export const ExperienceEntry = () => (
  <Card className="max-w-md">
    <CardHeader>
      <CardTitle>Senior Frontend Engineer</CardTitle>
      <CardDescription>Example company · 2021 – present</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm leading-6">
        Building scalable, user-focused web applications that balance elegant design with robust technology.
      </p>
    </CardContent>
    <CardFooter className="flex flex-wrap gap-2">
      <Badge variant="muted">Vue</Badge>
      <Badge variant="muted">Nuxt</Badge>
      <Badge variant="muted">TypeScript</Badge>
    </CardFooter>
  </Card>
);

export const WithAction = () => (
  <Card className="max-w-md">
    <CardHeader>
      <CardTitle>Portfolio site</CardTitle>
      <CardDescription>Nuxt, Supabase and Tailwind CSS</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm leading-6 text-muted-foreground">
        A hybrid-rendered portfolio with an admin dashboard for projects and experience.
      </p>
    </CardContent>
    <CardFooter>
      <Button variant="outline"><Icons.ArrowUpRight />Open project</Button>
    </CardFooter>
  </Card>
);
