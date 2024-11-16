# Supabase development

## Local Setup

To set up the local development environment, you need to start with initializing the Supabase project.  
Documentation on this topic can be found [here](https://supabase.com/docs/guides/local-development).

```bash
# Install the Supabase CLI 
# in this project it is already installed as a dev dependency
# but you can install it globally
yarn add supabase -D

# Initialize the Supabase project
yarn supabase init

# Start the Supabase project
yarn supabase start

# Link the project to the Supabase project
yarn supabase link --project-ref <project-id>
```

> [!NOTE] It requires Docker to be installed on your machine.
> If your docker image is not working properly its probably due to the not switched  
> `expose deamon on tcp://localhost:2375 without TLS` option in the Docker settings.
> You can find it in the Docker Desktop settings under the `General` tab.
> More on this in the [Supabase docs](https://supabase.com/docs/guides/local-development/cli/getting-started).

Now pull the database schema to your local environment.

```bash
# Pull the database schema first public
yarn supabase db pull
# Update remote migration history table? [Y/n] 
Y
# Pull the database schema for auth, storage
yarn supabase db pull --schema auth,storage
# Update remote migration history table? [Y/n]
Y
# Apply the changes locally
yarn supabase db reset
# To seed buckets run
yarn supabase seed buckets

```

> [!NOTE] If you need to run it again, delete the /migrations folder locally and delete all the migrations  
> in the supabase_migrations table on the supabase dashboard (see attached img).
>
> Once you have migration files in the /migrations folder, the way to apply these to your local db is by running supabase db reset.  
> If this runs without failure, your local schema should now match your  production schema.

### Types

To generate types for Supabase, run the following command:

```bash
# Login safely to Supabase
npx supabase login

# Generate types
npm run generate:supabase
```
