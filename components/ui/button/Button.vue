<template>
    <Primitive
        :as="as"
        :as-child="asChild"
        :class="cn(buttonVariants({ variant, size }), props.class)"
    >
        <slot />
    </Primitive>
</template>

<script setup lang="ts">

    import { Primitive, type PrimitiveProps } from 'radix-vue'

    import { type ButtonVariants, buttonVariants } from '.'

    import type { HTMLAttributes } from 'vue'

    interface Props extends PrimitiveProps {
        variant?: ButtonVariants['variant']
        size?: ButtonVariants['size']
        class?: HTMLAttributes['class']
    }

    const props = withDefaults(defineProps<Props>(), {
        as: 'button',
        variant: 'default',
        size: 'default',
        class: '',
    })
</script>
