<a id="development-top"></a>

# Development

<!-- TABLE OF CONTENTS -->
- [Development](#development)
  - [Documentation](#documentation)
  - [Common commands](#common-commands)
    - [Types](#types)
    - [Testing](#testing)
    - [Production build](#production-build)
  - [Github OAuth - admin dashboard access](#github-oauth---admin-dashboard-access)
    - [Development](#development-1)
    - [Production](#production)
  - [Supabase development](#supabase-development)
    - [Creating migrations](#creating-migrations)
    - [Connecting to the external Supabase DB (production)](#connecting-to-the-external-supabase-db-production)
    - [Pushing migrations](#pushing-migrations)
    - [Pulling changes](#pulling-changes)
  - [Testing](#testing-1)

## Documentation

- [Supabase - local development](https://supabase.com/docs/guides/local-development/overview)
- [Nuxt Supabase - documentation](https://supabase.nuxtjs.org/get-started)
- [@supabase/supabase-js - documentation](https://supabase.com/docs/reference/javascript/start)

<p align="right">(<a href="#development-top">back to top</a>)</p>

## Common commands

```sh
# Start the development server
yarn supabase start

# Stop the development server
yarn supabase stop

# Reset the database from the migrations
yarn supabase db reset
```

### Types

```sh
# Login to Supabase
yarn supabase login

# Generate types
# remember to change the --project-id in this command to your project ID
yarn types:supabase

# Generate types from the local database
yarn types:supabase:local
```

### Testing

```sh
# Run the tests
yarn test
```

### Production build

```sh
# Build the application for production:
yarn run build

# Locally preview production build:
yarn run preview
```

<p align="right">(<a href="#development-top">back to top</a>)</p>

## Github OAuth - admin dashboard access

[Official documentation](https://supabase.com/docs/guides/auth/social-login/auth-github)

<p align="right">(<a href="#development-top">back to top</a>)</p>

### Development

To enable Github OAuth locally, you need to create a new OAuth application on Github.  

1. Go to your Github account settings by clicking on your profile picture in the top right corner and selecting `Settings`.
2. Navigate to `Developer settings -> OAuth Apps`.
3. Select `New OAuth App`.
4. Fill in the form with the following data:
   - __Application name__: `your dev app name`
   - __Homepage URL__: <http://localhost:3000>
   - __App description__: `your app description`
   - __Authorization callback URL__: <http://localhost:54321/auth/v1/callback>
   - [ ] Enable Device Flow __(empty)__

Now you can add the `GITHUB_CLIENT_ID` and `GITHUB_SECRET` to your `.env` file.  
These are needed only for the development environment.

<p align="right">(<a href="#development-top">back to top</a>)</p>

### Production

For the production environment, you need to create a new OAuth application on Github.

1. Open the Supabase admin panel and navigate to `Authentication -> Providers`.
2. Enable the Github provider (keep this tab open for later).
3. Go to your Github account settings by clicking on your profile picture in the top right corner and selecting `Settings`.
4. Navigate to `Developer settings -> OAuth Apps`.
5. Select `New OAuth App`.
6. Fill in the form with the following data:
   - __Application name__: `your app name`
   - __Homepage URL__: `your final domain`
   - __App description__: `your app description`
   - __Authorization callback URL__: `your final domain/auth/v1/callback` (provided by Supabase in the Github Auth Providers settings)
7. Click `Register application`.

> [!NOTE]
> Domain changes and redirection issues  
> If you need to change the domain, from some temporary to the final one, you can encounter issues with the incorrect redirection.  
> In this case, you need to change the `Authorization callback URL` in the Github OAuth App settings but also  
> the Site URL in the Supabase settings `Authentication -> URL Configuration -> Site URL`.

<p align="right">(<a href="#development-top">back to top</a>)</p>

## Supabase development

To access the Supabase admin panel, open <http://127.0.0.1:54323> in your browser.

<p align="right">(<a href="#development-top">back to top</a>)</p>

### Creating migrations

```sh
# Create a new migration
yarn supabase migration new <migration-name>
```

Write the migration in the newly created file in the `/supabase/migrations` directory.

```sh
# Apply the migration
yarn supabase db reset
```

More about possible ways to manage migrations can be found in the [Supabase documentation](https://supabase.com/docs/guides/local-development/overview#database-migrations).

<p align="right">(<a href="#development-top">back to top</a>)</p>

### Connecting to the external Supabase DB (production)

```sh
# So far the Supabase CLI should be installed as a dev dependency.
# If "supabase" is not recognized, you can force it by reinstalling the package
yarn install supabase -D

# Login to Supabase
yarn supabase login

# Link the project to the Supabase project
yarn supabase link --project-ref <project-id>
```

<p align="right">(<a href="#development-top">back to top</a>)</p>

### Pushing migrations

Assuming that a new migration was created locally, you can push it to the production environment.

```sh
# Push the migration to the remote database
yarn supabase db push
```

<p align="right">(<a href="#development-top">back to top</a>)</p>

### Pulling changes

In case you've made some changes to the database schema in the production environment,  
you can pull these changes to your local environment.

```sh
# Pull the database schema first public
yarn supabase db pull
# Update remote migration history table? [Y/n] 
Y

# Pull the database schema for auth, storage
yarn supabase db pull --schema auth,storage
# Update remote migration history table? [Y/n]
Y

# Apply changes locally (including seeding the buckets)
yarn supabase db reset

# To seed buckets manually run
yarn supabase seed buckets
```

<p align="right">(<a href="#development-top">back to top</a>)</p>

## Testing

To start with testing you will need a `.env.test` file.

1. configure `.env` file as mentioned in the `README.md` in the section [Installation](../README.md#installation)
2. copy it
3. rename to `.env.test`.

To run the tests, use the following command:

```sh
# Prepare the test environment
yarn playwright install

# Start the local project - required for the e2e tests
yarn dev

# Run the tests
yarn test
```

<p align="right">(<a href="#development-top">back to top</a>)</p>
