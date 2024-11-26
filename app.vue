<template>
    <div>
        <NuxtLoadingIndicator
            color="repeating-linear-gradient(to right,#fef08a 0%,#facc15 50%,#ca8a04 100%)"
            :throttle="50"
        />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
    // make sure that the dark mode is applied on the first render
    // (even without JS active in the client)
    useHead({
        htmlAttrs: {
            class: 'dark',
        },
    })
    consoleLayout()
</script>
