<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button
                variant="ghost"
                class="w-8 h-8 p-0"
            >
                <span class="sr-only">
                    Open menu
                </span>
                <MoreHorizontal class="w-4 h-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <SheetTrigger as-child>
                <DropdownMenuItem @click="editClicked">
                    Edit
                </DropdownMenuItem>
            </SheetTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                class="text-destructive hover:text-destructive focus:text-destructive"
                @click="deleteClicked"
            >
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup lang="ts">
    import { MoreHorizontal } from 'lucide-vue-next'

    const props = defineProps<{
        item: unknown
    }>()

    const emits = defineEmits<{
        edit: [ item: unknown ]
        delete: [ item: unknown ]
    }>()

    const editClicked = () => {
        emits('edit', props.item)
    }

    const deleteClicked = () => {
        emits('delete', props.item)
    }
</script>
