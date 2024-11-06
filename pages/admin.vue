<template>
    <div class="container mx-auto px-4 py-16">
        <NuxtPage :page-key="route => route.fullPath" />
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        layout: 'admin',
        middleware: 'admin-auth'
    })
</script>
