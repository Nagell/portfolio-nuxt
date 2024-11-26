<template>
    <div>
        <h3 class="text-xl font-bold mb-4">
            Assets List
        </h3>
        <SheetTrigger as-child>
            <Button
                class="mb-4"
                @click="emits('openForm', { mode: 'add' })"
            >
                Add new
            </Button>
        </SheetTrigger>
        <ul>
            <li
                v-for="asset in assetsData"
                :key="asset.metadata?.id"
                class="mb-4 p-4 border rounded-lg flex justify-between"
            >
                <div class="flex gap-2">
                    <Avatar class="h-8 w-8 rounded-lg">
                        <AvatarImage
                            :src="useGetPublicURL(asset.name)"
                            :alt="asset.name"
                        />
                        <AvatarFallback class="rounded-lg">
                            <Image class="w-4" />
                        </AvatarFallback>
                    </Avatar>
                    <h4 class="text-lg font-bold">
                        {{ asset.name }}
                    </h4>
                </div>
                <div>
                    <Button
                        variant="link"
                        @click="deleteAsset(asset.name)"
                    >
                        Delete
                    </Button>
                    <SheetTrigger as-child>
                        <Button
                            variant="link"
                            @click="emits('openForm', { mode: 'edit', asset })"
                        >
                            Edit
                        </Button>
                    </SheetTrigger>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import {
        Image
    } from 'lucide-vue-next'

    import type { RealtimeChannel } from '@supabase/supabase-js'
    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { Asset } from '~/types/files.types'

    const supabaseClient = useSupabaseClient()

    const { $const } = useNuxtApp()

    let realtimeChannel: RealtimeChannel

    const emits = defineEmits<{
        openForm: [{ mode: FormProps['mode'], asset?: Asset }]
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

    /** Fetch all asset files from the bucket */
    const { data: assetsData, refresh: refreshAssets } = await useFetch<Asset[]>('/api/assets/list', {
        headers: useRequestHeaders([ 'cookie' ]),
        key: 'assets',
        method: 'get'
    })
    /** Delete a asset file from the bucket */
    async function deleteAsset(name: string) {
        await $fetch(`/api/assets/`, {
            headers: useRequestHeaders([ 'cookie' ]),
            query: { name },
            method: 'delete'
        })
    }
</script>
