<template>
    <div>
        <h3
            class="text-xl font-bold mb-4"
            :data-testid="testIds.admin.experience.header"
        >
            Experience List
        </h3>
        <SheetTrigger as-child>
            <Button
                class="mb-4"
                :data-testid="testIds.admin.experience.addExperienceButton"
                @click="emits('openForm', { mode: 'add' })"
            >
                Add new
            </Button>
        </SheetTrigger>
        <CommonDataTable
            v-if="experienceData"
            :columns="columns"
            :data="experienceData"
            filter-by="title"
            :data-testid="testIds.admin.experience.experienceList"
        />
    </div>
</template>

<script lang="ts" setup>
    import { ArrowUpDown } from 'lucide-vue-next'
    import { h } from 'vue'

    import DropdownAction from '~/components/common/DataTableDropdown.vue'
    import { Button } from '~/components/ui/button'
    import testIds from '~/pages/__tests__/testIds'

    import type { RealtimeChannel } from '@supabase/supabase-js'
    import type { ColumnDef } from '@tanstack/vue-table'
    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { DeleteExperienceQuery, Experience } from '~/types/experience.types'

    const supabaseClient = useSupabaseClient()

    let realtimeChannel: RealtimeChannel

    const emits = defineEmits<{
        openForm: [{ mode: FormProps['mode'], item?: Experience }]
    }>()

    onMounted(async () => {
        // Subscribe to the experience channel for real-time updates
        realtimeChannel = supabaseClient.channel('experience').on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'experience' },
            () => refreshExperience()
        )
        realtimeChannel.subscribe()
    })

    onUnmounted(() => {
        supabaseClient.removeChannel(realtimeChannel)
    })

    /** Define the columns for the experience table */
    const columns: ColumnDef<Experience>[] = [
        {
            accessorKey: 'title',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => [ 'Title', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' }) ])
            },
            cell: ({ row }) => h('div', { class: 'truncate overflow-hidden max-w-80' }, row.getValue('title')),
        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: ({ row }) => h('div', { class: 'truncate overflow-hidden max-w-80' }, row.getValue('description')),
        },
        {
            accessorKey: 'start',
            header: 'Start',
            cell: ({ row }) => h('div', { class: 'truncate overflow-hidden max-w-80' }, row.getValue('start')),
        },
        {
            accessorKey: 'end',
            header: 'End',
            cell: ({ row }) => h('div', { class: 'truncate overflow-hidden max-w-80' }, row.getValue('end')),
        },
        {
            accessorKey: 'link',
            header: 'Link',
            cell: ({ row }) => h('div', { class: 'truncate overflow-hidden max-w-80' }, row.getValue('link')),
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const item = row.original

                return h('div', { class: 'relative' }, h(DropdownAction, {
                    item,
                    onExpand: row.toggleExpanded,
                    onDelete: () => deleteExperience({ id: item.id }),
                    onEdit: () => emits('openForm', { mode: 'edit', item })
                }))
            },
        },
    ]

    /** Fetch all experience rows from the database */
    const { data: experienceData, refresh: refreshExperience } = await useFetch('/api/experience', {
        headers: useRequestHeaders([ 'cookie' ]),
        key: 'experience',
        method: 'get'
    })
    /** Delete an experience row from the database */
    async function deleteExperience(data: DeleteExperienceQuery) {
        await $fetch(`/api/experience`, {
            headers: useRequestHeaders([ 'cookie' ]),
            query: data,
            method: 'delete'
        })
    }
</script>
