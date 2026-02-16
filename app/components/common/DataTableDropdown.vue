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
        <DropdownMenuContent
            align="end"
            :data-testid="testIds.admin.dataTableDropdown.wrapper"
        >
            <SheetTrigger as-child>
                <DropdownMenuItem
                    :data-testid="testIds.admin.dataTableDropdown.edit"
                    @click="editClicked"
                >
                    Edit
                </DropdownMenuItem>
            </SheetTrigger>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                class="text-destructive hover:text-destructive focus:text-destructive"
                :data-testid="testIds.admin.dataTableDropdown.delete"
                @click="deleteClicked"
            >
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup lang="ts">
    import { MoreHorizontal } from 'lucide-vue-next'

    import testIds from '~/utils/testIds'

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
