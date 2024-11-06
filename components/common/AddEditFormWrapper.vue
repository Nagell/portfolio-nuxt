<template>
    <form
        class="mb-8"
        @submit.prevent="onSubmit"
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
        mode: 'add' | 'edit'
    }

    const props = defineProps<Props>()

    const emits = defineEmits<{
        submit: []
    }>()

    const buttonLabel = computed(
        () => props.mode === 'add'
            ? 'Add'
            : 'Edit')

    function onSubmit() {
        emits('submit')
    }
</script>
