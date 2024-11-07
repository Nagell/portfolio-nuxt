<template>
    <div class="container mx-auto px-4 py-16">
        <h1 class="text-4xl font-bold mb-8">
            Login page
        </h1>
        <button
            class="bg-primary text-surface-950 px-6 py-3 rounded-lg hover:bg-opacity-90 transition duration-300 mt-4"
            @click="signInWithGithub"
        >
            Sign In with Github
        </button>
    </div>
</template>

<script lang="ts" setup>
    const supabase = useSupabaseClient()

    const signInWithGithub = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: { redirectTo: `${window.location.origin}/admin/projects` }
        })

        if (error) console.log('signInWithGithub error', error)
    }
</script>
