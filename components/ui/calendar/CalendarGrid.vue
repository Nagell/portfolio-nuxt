<template>
    <CalendarGrid
        :class="cn('w-full border-collapse space-y-1', props.class)"
        v-bind="forwardedProps"
    >
        <slot />
    </CalendarGrid>
</template>

<script lang="ts" setup>
    import { CalendarGrid, type CalendarGridProps, useForwardProps } from 'radix-vue'
    import { type HTMLAttributes, computed } from 'vue'

    const props = defineProps<CalendarGridProps & { class?: HTMLAttributes['class'] }>()

    const delegatedProps = computed(() => {
        const { class: _, ...delegated } = props

        return delegated
    })

    const forwardedProps = useForwardProps(delegatedProps)
</script>
