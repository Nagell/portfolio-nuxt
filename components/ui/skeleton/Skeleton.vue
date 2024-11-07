<template>
    <div :class="cn('animate-pulse rounded-md bg-muted', props.class)" />
</template>

<script setup lang="ts">
    import { cn } from '@/lib/utils'

    import type { HTMLAttributes } from 'vue'

    interface SkeletonProps {
        class?: HTMLAttributes['class']
    }

    const props = defineProps<SkeletonProps>()
</script>
