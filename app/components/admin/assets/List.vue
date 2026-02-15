<template>
    <div>
        <h3
            class="text-xl font-bold mb-4"
            :data-testid="testIds.admin.assets.header"
        >
            Assets List
        </h3>
        <SheetTrigger as-child>
            <Button
                class="mb-4"
                :data-testid="testIds.admin.assets.addAssetButton"
                @click="emits('setFormData', { mode: 'add' })"
            >
                Add new
            </Button>
        </SheetTrigger>
        <CommonDataTable
            v-if="assetsData"
            :columns="columns"
            :data="assetsData"
            filter-by="name"
            :data-testid="testIds.admin.assets.assetList"
        />
    </div>
</template>

<script lang="ts" setup>
    import { ArrowUpDown, File, Image } from 'lucide-vue-next'
    import { h } from 'vue'

    import DropdownAction from '~/components/common/DataTableDropdown.vue'
    import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
    import { Button } from '~/components/ui/button'
    import { useToast } from '~/components/ui/toast'
    import testIds from '~/utils/testIds'

    import type { RealtimeChannel } from '@supabase/supabase-js'
    import type { ColumnDef } from '@tanstack/vue-table'
    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { Asset } from '~~/types/files.types'

    const supabaseClient = useSupabaseClient()

    const { $const } = useNuxtApp()

    let realtimeChannel: RealtimeChannel

    const emits = defineEmits<{
        setFormData: [{ mode: FormProps['mode'], item?: Asset }]
    }>()

    onMounted(async () => {
        // Subscribe to the assets channel for real-time updates
        realtimeChannel = supabaseClient.channel($const.assets.ASSETS_BUCKET).on(
            'postgres_changes',
            { event: '*', schema: 'storage', table: 'objects' },
            () => refreshAssets()
        )
        realtimeChannel.subscribe()
    })

    onUnmounted(() => {
        supabaseClient.removeChannel(realtimeChannel)
    })

    /** Define the columns for the assets table */
    const columns: ColumnDef<Asset>[] = [
        {
            accessorKey: 'image',
            header: 'Image',
            cell: ({ row }) => {
                const item = row.original

                return h('div', { class: 'relative' }, h(Avatar, { class: 'h-8 w-8 rounded-lg' }, () => [
                    h(AvatarImage, { src: useGetPublicURL(item.name), alt: 'Image' }),
                    h(AvatarFallback, { class: 'rounded-lg' }, () => [
                        isImage(item) ? h(Image, { class: 'h-4 w-4' }) : h(File, { class: 'h-4 w-4' })
                    ])
                ]))
            },
        },
        {
            accessorKey: 'name',
            header: ({ column }) => {
                return h(Button, {
                    variant: 'ghost',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
                }, () => [ 'Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' }) ])
            },
            cell: ({ row }) => h('div', { class: 'truncate overflow-hidden max-w-80' }, row.getValue('name')),
        },
        {
            accessorKey: 'metadata',
            header: 'Type',
            cell: ({ row }) => {
                const item = row.original
                return h('div', { class: 'truncate overflow-hidden max-w-80' }, item.metadata?.mimetype)
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const item = row.original

                return h('div', { class: 'relative' }, h(DropdownAction, {
                    item,
                    onExpand: row.toggleExpanded,
                    onDelete: () => deleteAsset(item.name),
                    onEdit: () => emits('setFormData', { mode: 'edit', item: item })
                }))
            },
        },
    ]

    /** Fetch all asset files from the bucket */
    const { data: assetsData, refresh: refreshAssets } = await useFetch<Asset[]>('/api/assets/list', {
        headers: useRequestHeaders([ 'cookie' ]),
        key: 'assets',
        method: 'get'
    })
    const { toast } = useToast()

    /** Delete an asset file from the bucket */
    async function deleteAsset(name: string) {
        try {
            await $fetch(`/api/assets/`, {
                headers: useRequestHeaders([ 'cookie' ]),
                query: { name },
                method: 'delete'
            })
        }
        catch (error) {
            console.error('Failed to delete asset:', error)
            toast({ title: 'Error', description: 'Failed to delete asset. Please try again.', variant: 'destructive' })
        }
    }
</script>
