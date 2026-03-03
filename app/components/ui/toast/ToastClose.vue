<template>
    <ToastClose
        v-bind="delegatedProps"
        :class="cn('absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-hidden focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-destructive-foreground group-[.destructive]:hover:text-destructive-foreground/80 group-[.destructive]:focus:ring-destructive group-[.destructive]:focus:ring-offset-destructive', props.class)"
    >
        <X class="h-4 w-4" />
    </ToastClose>
</template>

<script setup lang="ts">

    import { X } from 'lucide-vue-next'
    import { ToastClose } from 'reka-ui'
    import { computed } from 'vue'

    import type { ToastCloseProps } from 'reka-ui'
    import type { HTMLAttributes } from 'vue'

    const props = defineProps<ToastCloseProps & { class?: HTMLAttributes['class'] }>()

    const delegatedProps = computed(() => {
        const { class: _, ...delegated } = props

        return delegated
    })
</script>
