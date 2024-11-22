<template>
    <div>
        <h3 class="text-xl font-bold mb-4">
            Projects List
        </h3><SheetTrigger as-child>
            <Button
                class="mb-4"
                @click="emits('openForm', { mode: 'add' })"
            >
                Add new
            </Button>
        </SheetTrigger>
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
                        @click="deleteProject({ id: project.id })"
                    >
                        Delete
                    </Button><SheetTrigger as-child>
                        <Button
                            variant="link"
                            @click="emits('openForm', { mode: 'edit', project })"
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
    import type { RealtimeChannel } from '@supabase/supabase-js'
    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { DeleteProjectQuery, Project } from '~/types/projects.types'

    const supabaseClient = useSupabaseClient()

    let realtimeChannel: RealtimeChannel

    const emits = defineEmits<{
        openForm: [{ mode: FormProps['mode'], project?: Project }]
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
