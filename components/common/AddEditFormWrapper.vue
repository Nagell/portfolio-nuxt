<template>
    <SheetContent class="w-full sm:w-[540px]">
        <SheetHeader>
            <SheetTitle>{{ mode === 'edit' ? 'Edit' : 'Add' }} {{ title }}</SheetTitle>
            <SheetDescription>
                {{ description }}
            </SheetDescription>
        </SheetHeader>
        <form
            class="mt-6 space-y-6"
            @submit.prevent="onSubmit"
        >
            <slot />
            <SheetFooter>
                <SheetClose as-child>
                    <Button
                        type="submit"
                    >
                        {{ buttonLabel }}
                    </Button>
                </SheetClose>
            </SheetFooter>
        </form>
    </SheetContent>
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    export interface Props {
        mode: 'add' | 'edit'
        title?: string
        description?: string
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
