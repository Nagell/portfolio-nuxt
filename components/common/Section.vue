<template>
    <section
        :id="sectionId"
        :class="cn(props.class, 'py-16')"
    >
        <div class="container">
            <CommonTypography
                v-if="props.heading"
                :tag="tagComputed"
                :variant="variantComputed"
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
    })

    const sectionId = computed(
        () => props.id || props.heading?.toLowerCase().replace(/\s/g, '-')
    )

    const tagComputed = computed(() => props.tag || 'h1')

    const variantComputed = computed(() => {
        return props.variant || props.tag || 'h1'
    })
</script>
