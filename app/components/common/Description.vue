<template>
    <CommonTypography
        v-if="type === 'ul'"
        tag="ul"
        class="my-0 text-muted-foreground"
    >
        <CommonTypography
            v-for="(point, key) in parsedPoints"
            :key="key"
            tag="li"
            class="text-pretty"
        >
            <CommonMarkdownText :content="point" />
        </CommonTypography>
    </CommonTypography>
    <div v-if="type === 'p'">
        <CommonTypography
            v-for="(point, key) in parsedPoints"
            :key="key"
            tag="p"
            class="text-pretty"
        >
            <CommonMarkdownText :content="point" />
        </CommonTypography>
    </div>
</template>

<script lang="ts" setup>
    interface Props {
        description: string
        type?: 'ul' | 'p'
    }

    const props = withDefaults(defineProps<Props>(), {
        type: 'ul'
    })

    /** Sanitize and split the description into an array */
    const parsedPoints = computed(() => {
        return props.description.split('\n')
            .filter(item => item !== '')
            .map(item => item.trim())
    })
</script>
