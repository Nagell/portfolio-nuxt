<template>
    <section :class="cn(props.class, 'py-16')">
        <div class="container mx-auto px-4">
            <slot />
        </div>
    </section>
</template>

<script lang="ts" setup>
    import { cn } from '~/lib/utils'

    import type { HTMLAttributes } from 'vue'

    interface Props {
        class?: HTMLAttributes['class']
    }

    const props = defineProps<Props>()
</script>
