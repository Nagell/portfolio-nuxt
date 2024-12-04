<template>
    <CommonTypography
        tag="ul"
        class="my-0 text-muted-foreground"
    >
        <CommonTypography
            v-for="(point, key) in points"
            :key="key"
            tag="li"
            class="text-pretty"
        >
            {{ point }}
        </CommonTypography>
    </CommonTypography>
</template>

<script lang="ts" setup>
    interface Props {
        description: string
    }

    const props = defineProps<Props>()

    /** Sanitize and split the description into an array */
    const points = computed(() => {
        return props.description.split('\n')
            .filter(item => item !== '')
            .map(item => item.trim())
    })
</script>
