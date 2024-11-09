<template>
    <div>
        <NuxtPage :page-key="route => route.fullPath" />
    </div>
</template>

<script lang="ts" setup>
    definePageMeta({
        layout: 'admin',
        middleware: 'admin-auth'
    })
</script>
