<template>
    <form
        class="mb-8"
        @submit.prevent="onSubmit"
    >
        <slot />
        <SheetFooter>
            <SheetClose as-child>
                <Button
                    type="submit"
                    class="mt-4"
                >
                    {{ buttonLabel }}
                </Button>
            </SheetClose>
        </SheetFooter>
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
