<template>
    <div class="container mx-auto px-4 py-16">
        <h1 class="text-4xl font-bold mb-8">
            Login page
        </h1>
        <Button
            @click="signInWithGithub"
        >
            Sign In with Github
        </Button>
    </div>
</template>

<script lang="ts" setup>
    const supabaseClient = useSupabaseClient()

    const signInWithGithub = async () => {
        const { error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'github',
            options: { redirectTo: `${window.location.origin}/admin/projects` }
        })

        if (error) console.log('signInWithGithub error', error)
    }
</script>
