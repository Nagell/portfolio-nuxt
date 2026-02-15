<template>
    <ToastDescription
        v-bind="delegatedProps"
        :class="cn('text-sm opacity-90', props.class)"
    >
        <slot />
    </ToastDescription>
</template>

<script setup lang="ts">
    import { ToastDescription } from 'radix-vue'
    import { computed } from 'vue'

    import type { ToastDescriptionProps } from 'radix-vue'
    import type { HTMLAttributes } from 'vue'

    const props = defineProps<ToastDescriptionProps & { class?: HTMLAttributes['class'] }>()

    const delegatedProps = computed(() => {
        const { class: _, ...delegated } = props

        return delegated
    })
</script>
