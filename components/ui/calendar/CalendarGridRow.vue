<template>
    <CalendarGridRow
        :class="cn('flex', props.class)"
        v-bind="forwardedProps"
    >
        <slot />
    </CalendarGridRow>
</template>

<script lang="ts" setup>
    import { CalendarGridRow, type CalendarGridRowProps, useForwardProps } from 'radix-vue'
    import { type HTMLAttributes, computed } from 'vue'

    const props = defineProps<CalendarGridRowProps & { class?: HTMLAttributes['class'] }>()

    const delegatedProps = computed(() => {
        const { class: _, ...delegated } = props

        return delegated
    })

    const forwardedProps = useForwardProps(delegatedProps)
</script>
