<template>
    <div class="min-h-screen flex flex-col">
        <SpeedInsights />
        <LayoutAppHeader />
        <main class="flex-grow">
            <slot />
        </main>
        <LayoutAppFooter />
    </div>
</template>
<script setup lang="ts">
    import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>
