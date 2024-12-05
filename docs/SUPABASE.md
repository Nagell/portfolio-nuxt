# Supabase development

## Common commands

```bash
# Start the development server
yarn supabase start
# Stop the development server
yarn supabase stop
# Reset the database from the migrations
yarn supabase db reset
```

## Local Setup

To set up the local development environment, you need to start with initializing the Supabase project.  
Documentation on this topic can be found [here](https://supabase.com/docs/guides/local-development).

### Supabase CLI

```bash
# Install the Supabase CLI 
# in this project it is already installed as a dev dependency.
# If supabase is not recognized as a command after yarn install
# you can just force it by reinstalling the package
yarn install supabase -D

# Initialize the Supabase project
yarn supabase init

# Start the Supabase project
yarn supabase start

# Link the project to the Supabase project
yarn supabase link --project-ref <project-id>
```

> [!NOTE] Docker (required)
>
> If your docker image is not working properly its probably due to the not switched  
> `expose deamon on tcp://localhost:2375 without TLS` option in the Docker settings.  
> You can find it in the Docker Desktop settings under the `General` tab.  
> More on this in the [Supabase docs](https://supabase.com/docs/guides/local-development/cli/getting-started).

### Database schema

Now pull the database schema to your local environment.

```bash
# Login to Supabase
yarn supabase login
# Pull the database schema first public
yarn supabase db pull
# Update remote migration history table? [Y/n] 
Y
# Pull the database schema for auth, storage
yarn supabase db pull --schema auth,storage
# Update remote migration history table? [Y/n]
Y
```

Once you have migration files in the /migrations folder, the way to apply these to your  
local db is by running supabase db reset. If this runs without failure, your local schema  
should now match your production schema.

```bash
# Apply the changes locally (it also seeds the buckets)
yarn supabase db reset
# To seed buckets manually run
yarn supabase seed buckets
```

### Environment variables

Now you can add `.env` variables to your project. For this purpose, you can use the `.env.example` file.  
Nuxt doesn't support `.env.local`, `.env.development`, etc. files, so you have to create a `.env` file.

`SUPABASE_KEY` will be visible as `anon key` when Supabase container starts.

### Github OAuth

To enable Github OAuth, you need to create a new OAuth application on Github.  
More on this topic can be found [here](https://supabase.com/docs/guides/auth/social-login/auth-github).

Configure it as follows:

- __Application name__: `your dev app name`
- __Homepage URL__: <http://localhost:3000>
- __App description__: `your app description`
- __Authorization callback URL__: <http://localhost:54321/auth/v1/callback>
- [ ] Enable Device Flow __(empty)__

Now you can add the `GITHUB_CLIENT_ID` and `GITHUB_SECRET` to your `.env` file.  
These are needed only for the development environment.

#### Production

You can do exactly the same for the production environment by creating a separate OAuth application on Github.  
The only difference is that you need to change the:

- `Homepage URL` to the final domain
- and `Authorization callback URL` to the callback URL provided by production Supabase.

> [!NOTE] Domain changes and redirection issues  
> If you need to change the domain, from some temporary to the final one, you can encounter issues with the incorrect redirection.  
> In this case, you need to change the `Authorization callback URL` in the Github OAuth App settings but also  
> the Site URL in the Supabase settings `Authentication -> URL Configuration -> Site URL`.

### Types

To generate types for Supabase, run the following command:

```bash
# Login to Supabase
yarn supabase login

# Generate types
yarn types:supabase

# Generate types from the local database
yarn types:supabase:local
```

### Supabase Studio (local admin panel)

To access the Supabase admin panel, go to <http://127.0.0.1:54323> in your browser.
