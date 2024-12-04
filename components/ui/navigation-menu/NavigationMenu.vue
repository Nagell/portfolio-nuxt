<template>
    <NavigationMenuRoot
        v-bind="forwarded"
        :class="cn('sticky inset-0 bottom-auto z-10 !container rounded-xl !px-0', props.class)"
    >
        <div class="fixed inset-0 bottom-auto h-16 pointer-events-none select-none backdrop-blur-sm blur-mask" />
        <div class="mt-4 w-full flex flex-auto items-center justify-between px-2 border border-opacity-50 rounded-xl backdrop-blur-lg bg-background/50">
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
    .blur-mask {
        mask-image: linear-gradient(to bottom, theme('colors.background') 20%, theme('colors.transparent') calc(100% - 20%));
    }
</style>
