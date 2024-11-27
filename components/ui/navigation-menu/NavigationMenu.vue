<template>
    <NavigationMenuRoot
        v-bind="forwarded"
        :class="cn('fixed inset-0 bottom-auto z-10 flex items-center justify-center !container rounded-xl !px-0', props.class)"
    >
        <div class="fixed inset-0 bottom-auto h-[3.625rem] pointer-events-none backdrop-blur-sm" />
        <div class="container mt-4 w-full flex flex-auto items-center justify-start px-4 border border-opacity-50 rounded-xl backdrop-blur-lg bg-background/50">
            <slot />
            <NavigationMenuViewport />
        </div>
    </NavigationMenuRoot>
</template>

<script setup lang="ts">
    import {
        NavigationMenuRoot,
        type NavigationMenuRootEmits,
        type NavigationMenuRootProps,
        useForwardPropsEmits,
    } from 'radix-vue'
    import { type HTMLAttributes, computed } from 'vue'

    import { cn } from '@/lib/utils'

    import NavigationMenuViewport from './NavigationMenuViewport.vue'

    const props = defineProps<NavigationMenuRootProps & { class?: HTMLAttributes['class'] }>()

    const emits = defineEmits<NavigationMenuRootEmits>()

    const delegatedProps = computed(() => {
        const { class: _, ...delegated } = props

        return delegated
    })

    const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<style scoped lang="css">
    .container {
        max-width: 100%;
    }
</style>
