<template>
    <div>
        <div class="flex flex-col gap-2">
            <img
                v-if="isImage(asset)"
                :src="useGetPublicURL(asset.name)"
                class="w-full object-cover aspect-square rounded-md"
            >
            <div
                v-else
                class="w-full object-cover aspect-square rounded-md flex items-center justify-center border"
            >
                <File
                    class="w-1/3 h-1/3 !stroke-1"
                />
            </div>
        </div>
        <div>
            <p class="font-medium truncate mt-2">
                {{ asset.name }}
            </p>
            <div class="grid grid-rows-3 gap-2 mt-2 grid-cols-[.5fr_1fr]">
                <span class="text-xs text-muted-foreground grid grid-cols-subgrid grid-rows-3 gap-2 row-span-3">
                    <p>Size</p>
                    <p>Created at</p>
                    <p>Updated at</p>
                </span>
                <span class="text-sm font-medium grid grid-cols-subgrid grid-rows-3 gap-2 row-span-3">
                    <p>{{ fileSize(props.asset) }}</p>
                    <p>{{ convertDate(asset.created_at) }}</p>
                    <p>{{ convertDate(asset.updated_at) }}</p>
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { File } from 'lucide-vue-next'

    import type { Asset } from '~/types/files.types'

    export interface Props {
        asset: Asset
    }

    const props = defineProps<Props>()

    /** Converts the date to a human readable format */
    function convertDate(date: string) {
        return new Date(date).toLocaleString()
    }
</script>
