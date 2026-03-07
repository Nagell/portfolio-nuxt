<template>
    <div class="min-h-screen flex flex-col">
        <SpeedInsights />
        <ClientOnly>
            <LayoutAppHeader />
            <template #fallback>
                <div class="h-16.5" />
            </template>
        </ClientOnly>
        <main class="grow">
            <slot />
        </main>
        <LayoutAppFooter />
    </div>
</template>
<script setup lang="ts">
    import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>
