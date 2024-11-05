<template>
    <form
        class="mb-8"
        @submit.prevent="submit"
    >
        <slot />
        <Button
            type="submit"
            class="mt-4"
        >
            {{ buttonLabel }}
        </Button>
    </form>
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    export interface Props {
        post: () => Promise<void> | void
        patch: () => Promise<void> | void
        mode: 'add' | 'edit'
    }

    const props = withDefaults(defineProps<Props>(), {
        post: () => {},
        patch: () => {},
        mode: 'add'
    })

    const buttonLabel = computed(
        () => props.mode === 'add'
            ? 'Add'
            : 'Edit')

    const submit = () => {
        props.mode === 'add'
            ? props.post()
            : props.patch()
    }
</script>
