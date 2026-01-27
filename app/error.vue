<template>
    <NuxtLayout
        name="empty"
        class="bg-gradient-to-b from-foreground/10 to-transparent"
    >
        <div
            v-if="error"
            class="container min-h-screen flex items-center justify-center flex-col space-y-6 py-20"
        >
            <template v-if="error.statusCode === 404">
                <CommonTypography
                    tag="h1"
                    class="text-8xl"
                >
                    404
                </CommonTypography>
                <CommonTypography
                    tag="h2"
                    variant="h3"
                >
                    Sorry, this page doesn't exist.
                </CommonTypography>
            </template>
            <template v-else>
                <CommonTypography tag="h1">
                    Damn! 🤯
                </CommonTypography>
                <CommonTypography
                    tag="h2"
                    variant="h3"
                    class="text-center text-muted-foreground"
                >
                    It looks like something broke. <br>
                    Sorry about that.
                </CommonTypography>
                <CommonTypography
                    tag="p"
                    class="font-bold max-w-96"
                >
                    {{ error.message }}
                </CommonTypography>
            </template>
            <Button
                type="button"
                class="px-10"
                @click="handleError"
            >
                <ArrowLeft />
                Go back
            </Button>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
    import { ArrowLeft } from 'lucide-vue-next'

    const error = useError()

    const handleError = () => {
        clearError({
            redirect: '/',
        })
    }
</script>
