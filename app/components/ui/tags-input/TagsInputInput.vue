<template>
    <TagsInputInput
        v-bind="forwardedProps"
        :class="cn('text-sm min-h-6 focus:outline-hidden flex-1 bg-transparent px-1', props.class)"
    />
</template>

<script setup lang="ts">
    import { TagsInputInput, type TagsInputInputProps, useForwardProps } from 'reka-ui'
    import { type HTMLAttributes, computed } from 'vue'

    const props = defineProps<TagsInputInputProps & { class?: HTMLAttributes['class'] }>()

    const delegatedProps = computed(() => {
        const { class: _, ...delegated } = props

        return delegated
    })

    const forwardedProps = useForwardProps(delegatedProps)
</script>
