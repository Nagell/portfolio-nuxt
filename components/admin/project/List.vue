<template>
    <div>
        <h3
            class="text-xl font-bold mb-4"
            :data-testid="testIds.admin.projects.header"
        >
            Projects List
        </h3>
        <SheetTrigger as-child>
            <Button
                class="mb-4"
                :data-testid="testIds.admin.projects.addProjectButton"
                @click="emits('openForm', { mode: 'add' })"
            >
                Add new
            </Button>
        </SheetTrigger>
        <CommonDataTable
            v-if="projectsData"
            :columns="columns"
            :data="projectsData"
            filter-by="title"
            :data-testid="testIds.admin.projects.projectList"
        />
    </div>
</template>

<script lang="ts" setup>
    import { ArrowUpDown, Image } from 'lucide-vue-next'
    import { h } from 'vue'

    import DropdownAction from '~/components/common/DataTableDropdown.vue'
    import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
    import { Button } from '~/components/ui/button'
    import testIds from '~/pages/__tests__/testIds'

    import type { RealtimeChannel } from '@supabase/supabase-js'
    import type { ColumnDef } from '@tanstack/vue-table'
    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { DeleteProjectQuery, Project } from '~/types/projects.types'

    const supabaseClient = useSupabaseClient()

    let realtimeChannel: RealtimeChannel

    const emits = defineEmits<{
        openForm: [{ mode: FormProps['mode'], item?: Project }]
    }>()

    onMounted(async () => {
        // Subscribe to the projects channel for real-time updates
        realtimeChannel = supabaseClient.channel('projects').on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'projects' },
            () => refreshProjects()
        )
        realtimeChannel.subscribe()
    })

    onUnmounted(() => {
        supabaseClient.removeChannel(realtimeChannel)
    })

    /** Define the columns for the projects table */
    const columns: ColumnDef<Project>[] = [
        {
            accessorKey: 'image',
            header: 'Image',
            cell: ({ row }) => {
                const image = row.getValue('image') as Project['image']

                return h('div', { class: 'relative' }, h(Avatar, { class: 'h-8 w-8 rounded-lg' }, () => [
                    h(AvatarImage, { src: image, alt: 'Image' }),
                    h(AvatarFallback, { class: 'rounded-lg' }, () => [
                        h(Image, { class: 'h-4 w-4' })
                    ])
                ]))
            },
        },
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
            accessorKey: 'url',
            header: 'URL',
            cell: ({ row }) => h('div', { class: 'truncate overflow-hidden max-w-80' }, row.getValue('url')),
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const item = row.original

                return h('div', { class: 'relative' }, h(DropdownAction, {
                    item,
                    onExpand: row.toggleExpanded,
                    onDelete: () => deleteProject({ id: item.id }),
                    onEdit: () => emits('openForm', { mode: 'edit', item })
                }))
            },
        },
    ]

    /** Fetch all projects rows from the database */
    const { data: projectsData, refresh: refreshProjects } = await useFetch('/api/projects', {
        headers: useRequestHeaders([ 'cookie' ]),
        key: 'projects',
        method: 'get'
    })
    /** Delete a project row from the database */
    async function deleteProject(data: DeleteProjectQuery) {
        await $fetch(`/api/projects`, {
            headers: useRequestHeaders([ 'cookie' ]),
            query: data,
            method: 'delete'
        })
    }
</script>
