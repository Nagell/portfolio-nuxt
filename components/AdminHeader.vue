<template>
    <header class="py-4">
        <nav class="container mx-auto px-4 flex justify-between items-center">
            <NuxtLink
                to="/"
                class="text-2xl font-bold text-primary"
            >
                My Portfolio - Admin
            </NuxtLink>
            <div class="space-x-4">
                <span v-if="supabaseUser">
                    Hello, {{ supabaseUser.user_metadata.full_name }}
                </span>
                <NuxtLink
                    to="/"
                    class="text-foreground hover:text-primary"
                >
                    Home
                </NuxtLink>
                <Button
                    size="sm"
                    @click="logout"
                >
                    Logout
                </Button>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
    import type { Database } from '~/types/database.types'

    const supabaseClient = useSupabaseClient<Database>()
    const supabaseUser = useSupabaseUser()

    /**
     * Log out the current user
     */
    async function logout() {
        supabaseClient.auth.signOut({})
        await navigateTo('/login')
    }
</script>
