<template>
    <section :class="cn(props.class, 'py-16')">
        <div class="container">
            <CommonTypography
                v-if="props.heading"
                tag="h2"
            >
                {{ heading }}
            </CommonTypography>
            <slot />
        </div>
    </section>
</template>

<script lang="ts" setup>
    import { cn } from '~/lib/utils'

    import type { HTMLAttributes } from 'vue'

    interface Props {
        class?: HTMLAttributes['class']
        heading?: string
    }

    const props = defineProps<Props>()
</script>
