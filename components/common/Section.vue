<template>
    <section
        :id="headingId"
        :class="cn(props.class, 'py-16')"
    >
        <div class="container">
            <CommonTypography
                v-if="props.heading"
                :tag="tag"
                :variant="variant"
            >
                {{ heading }}
            </CommonTypography>
            <slot />
        </div>
    </section>
</template>

<script lang="ts" setup>

    import type { HTMLAttributes } from 'vue'
    import type { Props as TypographyProps } from '~/components/common/Typography.vue'

    interface Props {
        class?: HTMLAttributes['class']
        heading?: string
        id?: string
        tag?: TypographyProps['tag']
        variant?: TypographyProps['variant']
    }

    const props = withDefaults(defineProps<Props>(), {
        class: '',
        heading: '',
        id: '',
        tag: 'h2',
        variant: 'h2'
    })

    const headingId = computed(
        () => props.id || props.heading?.toLowerCase().replace(/\s/g, '-')
    )
</script>
