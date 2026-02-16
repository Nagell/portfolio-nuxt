<template>
    <div
        :class="
            cn('flex flex-col gap-y-2 sm:text-left', props.class)
        "
    >
        <slot />
    </div>
</template>

<script setup lang="ts">

    import type { HTMLAttributes } from 'vue'

    const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>
