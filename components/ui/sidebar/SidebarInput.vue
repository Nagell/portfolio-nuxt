<template>
    <Input
        data-sidebar="input"
        :class="cn(
            'h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
            props.class,
        )"
    >
        <slot />
    </Input>
</template>

<script setup lang="ts">
    import Input from '@/components/ui/input/Input.vue'

    import type { HTMLAttributes } from 'vue'

    const props = defineProps<{
        class?: HTMLAttributes['class']
    }>()
</script>
