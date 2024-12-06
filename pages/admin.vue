<template>
    <div>
        <NuxtPage :page-key="route => route.fullPath" />
    </div>
</template>

<script lang="ts" setup>
    useHead({
        title: 'Dawid Nitka | Dashboard',
    })
    definePageMeta({
        layout: 'admin',
        middleware: 'admin-auth'
    })
</script>
