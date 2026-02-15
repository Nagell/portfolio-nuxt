<template>
    <div>
        <NuxtLoadingIndicator
            color="repeating-linear-gradient(to right,hsl(47.9 95.8% 70%) 0%,hsl(47.9 95.8% 53.1%) 50%,hsl(35.5 91.7% 32.9%) 100%)"
            :throttle="50"
        />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <Toaster />
    </div>
</template>

<script setup lang="ts">

    const { $consoleLayout } = useNuxtApp()
    useHead({
        meta: [
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'author', content: 'Dawid Nitka' },
        ],
        htmlAttrs: {
            // make sure that the dark mode is applied on the first render
            // (even without JS active in the client)
            class: 'dark',
            lang: 'en',
        },
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon_black.ico', media: '(prefers-color-scheme: light)' },
            { rel: 'icon', type: 'image/x-icon', href: '/favicon_white.ico', media: '(prefers-color-scheme: dark)' }
        ]
    })

    onMounted(() => {
        $consoleLayout()
    })
</script>
