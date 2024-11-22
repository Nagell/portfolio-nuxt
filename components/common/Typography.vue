<template>
    <component
        :is="tag"
        :class="cn(variantClasses, props.class)"
    >
        <slot />
    </component>
</template>

<script lang="ts" setup>
    import { cn } from '~/lib/utils'

    import type { HTMLAttributes } from 'vue'

    type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'ul' | 'li' | 'code'

    interface Props {
        tag?: Variant
        variant?: Variant
        class?: HTMLAttributes['class']
    }

    const props = withDefaults(defineProps<Props>(), {
        tag: 'p',
        class: ''
    })

    const variantClasses = computed(() => {
        const variantStyles: Record<Variant, string> = {
            h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
            h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
            h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
            h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
            p: 'leading-7 [&:not(:first-child)]:mt-6',
            ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
            li: 'leading-7',
            code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'
        }

        return variantStyles[props.variant || props.tag]
    })
</script>
