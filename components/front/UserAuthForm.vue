<template>
    <div :class="cn('grid gap-6', $attrs.class ?? '')">
        <NuxtLink
            to="/"
            :class="cn(
                buttonVariants({ variant: 'default' }),
                'w-full',
            )"
        >
            <ArrowLeft />
            Go back
        </NuxtLink>
        <div class="relative">
            <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-background px-2 text-muted-foreground">
                    or continue if you are me
                </span>
            </div>
        </div>
        <Button
            variant="outline"
            type="button"

            :disabled="isLoading"
            @click="signInWithGithub"
        >
            <Loader2
                v-if="isLoading"
                class="mr-2 h-4 w-4 animate-spin"
            />
            <Github
                v-else
                class="mr-2 h-4 w-4"
            />
            GitHub
        </Button>
    </div>
</template>

<script setup lang="ts">
    import { ArrowLeft, Github, Loader2 } from 'lucide-vue-next'
    import { ref } from 'vue'

    import { buttonVariants } from '../ui/button'

    const supabaseClient = useSupabaseClient()
    const isLoading = ref(false)

    const signInWithGithub = async () => {
        isLoading.value = true

        setTimeout(() => {
            isLoading.value = false
        }, 3000)

        const { error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'github',
            options: { redirectTo: `${window.location.origin}/admin/projects` }
        })

        if (error) throw Error(error.message)
    }
</script>
