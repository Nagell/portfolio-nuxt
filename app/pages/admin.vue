<template>
    <div>
        <NuxtPage :page-key="(route: RouteLocationNormalized) => route.fullPath" />
    </div>
</template>

<script lang="ts" setup>
    import type { RouteLocationNormalized } from 'vue-router'

    useHead({
        title: 'Dawid Nitka | Dashboard',
    })
    definePageMeta({
        layout: 'admin',
        middleware: 'admin-auth'
    })
</script>
