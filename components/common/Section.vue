<template>
    <section
        :id="headingId"
        :class="cn(props.class, 'py-16')"
    >
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

    import type { HTMLAttributes } from 'vue'

    interface Props {
        class?: HTMLAttributes['class']
        heading?: string
        id?: string
    }

    const props = defineProps<Props>()

    const headingId = computed(() => props.id || props.heading?.toLowerCase().replace(/\s/g, '-'))
</script>
