<template>
    <ComboboxContent
        v-bind="forwarded"
        :class="cn('max-h-[300px] overflow-y-auto overflow-x-hidden', props.class)"
    >
        <div role="presentation">
            <slot />
        </div>
    </ComboboxContent>
</template>

<script setup lang="ts">
    import { ComboboxContent, useForwardPropsEmits } from 'reka-ui'
    import { type HTMLAttributes, computed } from 'vue'

    import type { ComboboxContentEmits, ComboboxContentProps } from 'reka-ui'

    const props = defineProps<ComboboxContentProps & { class?: HTMLAttributes['class'] }>()
    const emits = defineEmits<ComboboxContentEmits>()

    const delegatedProps = computed(() => {
        const { class: _, ...delegated } = props

        return delegated
    })

    const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>
