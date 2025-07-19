<template>
    <div
        v-if="hasTags"
        class="flex flex-wrap gap-2"
    >
        <Badge
            v-for="(tag, key) in tags"
            :key="key"
            variant="muted"
        >
            {{ tag }}
        </Badge>
    </div>
</template>

<script lang="ts" setup>
    import type { Json } from '~/types/database.types'

    interface Props {
        tags: Json
    }

    const props = defineProps<Props>()

    /** Check if there are any tags */
    const hasTags = computed(() => Array.isArray(props.tags) && props.tags.length > 0)
</script>
