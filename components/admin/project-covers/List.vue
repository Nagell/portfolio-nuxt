<template>
    <div>
        <h3 class="text-xl font-bold mb-4">
            ProjectCovers List
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
                v-for="projectCover in projectCoversData"
                :key="projectCover.metadata?.id"
                class="mb-4 p-4 border rounded-lg flex justify-between"
            >
                <div class="flex gap-2">
                    <Avatar class="h-8 w-8 rounded-lg">
                        <AvatarImage
                            :src="useGetPublicURL(projectCover.name)"
                            :alt="projectCover.name"
                        />
                        <AvatarFallback class="rounded-lg">
                            <Image class="w-4" />
                        </AvatarFallback>
                    </Avatar>
                    <h4 class="text-lg font-bold">
                        {{ projectCover.name }}
                    </h4>
                </div>
                <div>
                    <Button
                        variant="link"
                        @click="deleteImage(projectCover.name)"
                    >
                        Delete
                    </Button>
                    <SheetTrigger as-child>
                        <Button
                            variant="link"
                            @click="emits('openForm', { mode: 'edit', projectCover })"
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
    import type { ProjectCover } from '~/types/files.types'

    const supabaseClient = useSupabaseClient()

    const { $const } = useNuxtApp()

    let realtimeChannel: RealtimeChannel

    const emits = defineEmits<{
        openForm: [{ mode: FormProps['mode'], projectCover?: ProjectCover }]
    }>()

    onMounted(async () => {
        realtimeChannel = supabaseClient.channel($const.covers.PROJECT_COVERS_BUCKET).on(
            'postgres_changes',
            { event: '*', schema: 'storage', table: 'objects' },
            () => refreshProjectCovers()
        )
        realtimeChannel.subscribe()
    })

    onUnmounted(() => {
        supabaseClient.removeChannel(realtimeChannel)
    })

    /** Fetch all project cover files from the bucket */
    const { data: projectCoversData, refresh: refreshProjectCovers } = await useFetch<ProjectCover[]>('/api/project-covers/list', {
        headers: useRequestHeaders([ 'cookie' ]),
        key: 'projectCovers',
        method: 'get'
    })
    /** Delete a project cover file from the bucket */
    async function deleteImage(name: string) {
        await $fetch(`/api/project-covers/`, {
            headers: useRequestHeaders([ 'cookie' ]),
            query: { name },
            method: 'delete'
        })
    }
</script>
