<template>
    <div class="relative w-full overflow-auto">
        <table :class="cn('w-full caption-bottom text-sm', props.class)">
            <slot />
        </table>
    </div>
</template>

<script setup lang="ts">

    import type { HTMLAttributes } from 'vue'

    const props = defineProps<{
        class?: HTMLAttributes['class']
    }>()
</script>
