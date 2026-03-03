<template>
    <ToastDescription
        v-bind="delegatedProps"
        :class="cn('text-sm opacity-90', props.class)"
    >
        <slot />
    </ToastDescription>
</template>

<script setup lang="ts">
    import { ToastDescription } from 'reka-ui'
    import { computed } from 'vue'

    import type { ToastDescriptionProps } from 'reka-ui'
    import type { HTMLAttributes } from 'vue'

    const props = defineProps<ToastDescriptionProps & { class?: HTMLAttributes['class'] }>()

    const delegatedProps = computed(() => {
        const { class: _, ...delegated } = props

        return delegated
    })
</script>
