<template>
    <div
        ref="carouselRef"
    >
        <div
            :class="
                cn(
                    'flex',
                    orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
                    props.class,
                )"
            v-bind="$attrs"
        >
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useCarousel } from './useCarousel'

    import type { WithClassAsProps } from './interface'

    defineOptions({
        inheritAttrs: false,
    })

    const props = defineProps<WithClassAsProps>()

    const { carouselRef, orientation } = useCarousel()
</script>
