<template>
    <div>
        <h3 class="text-xl font-bold mb-4">
            Projects List
        </h3>
        <Button
            class="mb-4"
            @click="emits('openForm', { mode: 'add' })"
        >
            Add new
        </Button>
        <ul>
            <li
                v-for="project in projectsData"
                :key="project.id"
                class="mb-4 p-4 bg-surface-800 rounded-lg flex justify-between"
            >
                <div>
                    <h4 class="text-lg font-bold">
                        {{ project.title }}
                    </h4>
                    <p>{{ project.description }}</p>
                </div>
                <div>
                    <Button
                        variant="link"
                        @click="deleteProject(project.id)"
                    >
                        Delete
                    </Button>
                    <Button
                        variant="link"
                        @click="emits('openForm', { mode: 'edit', project })"
                    >
                        Edit
                    </Button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import type { RealtimeChannel } from '@supabase/supabase-js'
    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { Database, Tables } from '~/types/database.types'

    const supabaseClient = useSupabaseClient<Database>()

    let realtimeChannel: RealtimeChannel

    const emits = defineEmits<{
        openForm: [{ mode: FormProps['mode'], project?: Tables<'projects'> }]
    }>()

    onMounted(async () => {
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

    /**
     * Fetch all projects from the database
     */
    const { data: projectsData, refresh: refreshProjects } = await useFetch('/api/projects', {
        headers: useRequestHeaders([ 'cookie' ]),
        key: 'projects',
        method: 'get'
    })
    /**
     * Delete a project from the database
     * @param id The ID of the project to delete
     */
    async function deleteProject(id: number) {
        await $fetch(`/api/projects`, {
            headers: useRequestHeaders([ 'cookie' ]),
            query: { id },
            method: 'delete'
        })
    }
</script>
