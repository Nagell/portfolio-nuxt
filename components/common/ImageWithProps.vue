<template>
    <div class="flex flex-col gap-2">
        <img
            :src="useGetPublicURL(image.name)"
            class="w-full object-cover aspect-square rounded-md"
        >
        <div>
            <p class="font-medium truncate">
                {{ image.name }}
            </p>
            <div class="grid grid-rows-3 gap-2 mt-2 grid-cols-[.5fr_1fr]">
                <span class="text-xs text-muted-foreground grid grid-cols-subgrid grid-rows-3 gap-2 row-span-3">
                    <p>Size</p>
                    <p>Created at</p>
                    <p>Updated at</p>
                </span>
                <span class="text-sm font-medium grid grid-cols-subgrid grid-rows-3 gap-2 row-span-3">
                    <p>{{ fileSize }}</p>
                    <p>{{ convertDate(image.created_at) }}</p>
                    <p>{{ convertDate(image.updated_at) }}</p>
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import type { FileObject } from '@supabase/storage-js'

    export interface Props {
        image: FileObject
    }

    const props = defineProps<Props>()
    /**
     * Shows different file size descriptions on the file size (in B, KB or MB)
     */
    const fileSize = computed(() => {
        const size = props.image.metadata?.size
        if (!size) return
        if (size < 1024) return size + ' B'
        if (size < 1024 * 1024) return size / 1024 + ' KB'
        if (size < 1024 * 1024 * 1024) return size / 1024 / 1024 + ' MB'

        return size
    })
    /**
     * Converts the date to a human readable format
     */
    const convertDate = (date: string) => {
        return new Date(date).toLocaleString()
    }
</script>
