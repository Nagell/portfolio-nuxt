<template>
    <AvatarRoot :class="cn(avatarVariant({ size, shape }), props.class)">
        <slot />
    </AvatarRoot>
</template>

<script setup lang="ts">
    import { AvatarRoot } from 'radix-vue'

    import { cn } from '@/lib/utils'

    import { type AvatarVariants, avatarVariant } from '.'

    import type { HTMLAttributes } from 'vue'

    const props = withDefaults(defineProps<{
        class?: HTMLAttributes['class']
        size?: AvatarVariants['size']
        shape?: AvatarVariants['shape']
    }>(), {
        size: 'sm',
        shape: 'circle',
    })
</script>
