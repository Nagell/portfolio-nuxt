<template>
    <ComboboxRoot
        v-bind="forwarded"
        :class="cn('flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground', props.class)"
    >
        <slot />
    </ComboboxRoot>
</template>

<script setup lang="ts">
    import { ComboboxRoot, useForwardPropsEmits } from 'radix-vue'
    import { type HTMLAttributes, computed } from 'vue'

    import type { ComboboxRootEmits, ComboboxRootProps } from 'radix-vue'

    const props = withDefaults(defineProps<ComboboxRootProps & { class?: HTMLAttributes['class'] }>(), {
        open: true,
        modelValue: '',
    })

    const emits = defineEmits<ComboboxRootEmits>()

    const delegatedProps = computed(() => {
        const { class: _, ...delegated } = props

        return delegated
    })

    const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>
