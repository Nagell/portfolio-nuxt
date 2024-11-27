# Dawid Nitka - Portfolio

> [!NOTE]
> This project is still in progress.  

It is a personal portfolio website built with:

- `nuxt` - Vue framework with built-in SSR,
- `supabase` - Postgres database with auth,
- `tailwindcss` - CSS framework,
- `shadcn-vue` - radix based components,
- `lucide` - SVG icons,

of course with `typescript` and `eslint` for better code quality.  
The project is deployed and hosted on Vercel.

## About

Projects main goal it to try out a combination of Nuxt and Supabase.  
The Admin Dashboard is built with SSR and CRUD operations are done on the server side.  
Front (landing pages) on the other hand is built with ISR, which means that the data  
is fetched at build time and then served from the cache.

## Tasks

- [x] Add Supabase integration
- [x] Add Tailwind CSS integration
- [x] Add admin panel with authentication
- [x] Add server-side CRUD operations for projects
- [x] Add server-side CRUD operations for images
- [x] Add image optimization
- [x] Deploy to Vercel
- [x] Add CI/CD
- [x] End testing phase - prepare dev and prod environments
- [ ] Create a design for
  - [ ] landing page
  - [ ] login page
  - [ ] admin panel
- [ ] Add animations
- [ ] Add meta tags
- [ ] Add license
- [ ] Improve a11y - <https://www.a11yproject.com/checklist/>
- [ ] Connect final domain to the main branch
- [ ] Add a rebuild trigger on Vercel when DB changes
- [ ] Add Vitest and tests
- [ ] Add i18n
- [ ] Add color switcher
- [ ] stats from vercel and cookie banner with cookie-control

## Setup

Make sure to install the dependencies:

```bash
yarn install
```

## Development Server

Start the development server on <http://localhost:3000>

```bash
yarn run dev
```

## Supabase & Development

More on this in the [Supabase development](./docs/SUPABASE.md).

## Production

Build the application for production:

```bash
yarn run build
```

Locally preview production build:

```bash
yarn run preview
```
