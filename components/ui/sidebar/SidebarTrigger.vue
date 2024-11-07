<template>
    <Button
        data-sidebar="trigger"
        variant="ghost"
        size="icon"
        :class="cn('h-7 w-7', props.class)"
        @click="toggleSidebar"
    >
        <PanelLeft />
        <span class="sr-only">
            Toggle Sidebar
        </span>
    </Button>
</template>

<script setup lang="ts">
    import { PanelLeft } from 'lucide-vue-next'

    import Button from '@/components/ui/button/Button.vue'
    import { cn } from '@/lib/utils'

    import { useSidebar } from './utils'

    import type { HTMLAttributes } from 'vue'

    const props = defineProps<{
        class?: HTMLAttributes['class']
    }>()

    const { toggleSidebar } = useSidebar()
</script>
