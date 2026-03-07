<template>
    <div class="min-h-screen flex flex-col">
        <SpeedInsights />
        <ClientOnly><LayoutAppHeader /></ClientOnly>
        <main class="grow">
            <slot />
        </main>
        <LayoutAppFooter />
    </div>
</template>
<script setup lang="ts">
    import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>
