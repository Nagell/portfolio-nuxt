<template>
    <ToastRoot
        v-bind="forwarded"
        :class="cn(toastVariants({ variant }), props.class)"
        @update:open="onOpenChange"
    >
        <slot />
    </ToastRoot>
</template>

<script setup lang="ts">

    import { ToastRoot, useForwardPropsEmits } from 'radix-vue'
    import { computed } from 'vue'

    import { toastVariants } from '.'

    import type { ToastProps } from '.'
    import type { ToastRootEmits } from 'radix-vue'

    const props = defineProps<ToastProps>()

    const emits = defineEmits<ToastRootEmits>()

    const delegatedProps = computed(() => {
        const { class: _, ...delegated } = props

        return delegated
    })

    const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>
