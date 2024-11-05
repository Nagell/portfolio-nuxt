<template>
    <div class="container mx-auto px-4 py-16">
        <h1 class="text-4xl font-bold mb-8">
            Admin Dashboard
        </h1>
        <div v-if="supabaseUser">
            <div class="flex w-full justify-between gap-4">
                <h2 class="text-2xl font-bold">
                    Hello, {{ supabaseUser.user_metadata.full_name }}
                </h2>
                <button
                    class="bg-primary text-surface-950 px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-300"
                    @click="logout"
                >
                    Logout
                </button>
            </div>
            <h3 class="text-xl font-bold mb-4">
                Manage Projects
            </h3>
            <CommonForm
                :post="addProject"
                :patch="() => patchProject(currentProject)"
                :mode="mode"
            >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label
                            for="title"
                            class="block text-sm font-medium text-surface-300"
                        >
                            Title
                        </label>
                        <input
                            id="title"
                            v-model="currentProject.title"
                            type="text"
                            required
                            class="mt-1 block w-full rounded-md bg-surface-700 border-surface-600 text-foreground"
                        >
                    </div>
                    <div>
                        <label
                            for="description"
                            class="block text-sm font-medium text-surface-300"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            v-model="currentProject.description"
                            required
                            class="mt-1 block w-full rounded-md bg-surface-700 border-surface-600 text-foreground"
                        />
                    </div>
                    <div>
                        <label
                            for="image"
                            class="block text-sm font-medium text-surface-300"
                        >
                            Image URL
                        </label>
                        <input
                            id="image"
                            v-model="currentProject.image"
                            type="url"
                            required
                            class="mt-1 block w-full rounded-md bg-surface-700 border-surface-600 text-foreground"
                        >
                    </div>
                    <div>
                        <label
                            for="github_url"
                            class="block text-sm font-medium text-surface-300"
                        >
                            GitHub URL
                        </label>
                        <input
                            id="github_url"
                            v-model="currentProject.github_url"
                            type="url"
                            required
                            class="mt-1 block w-full rounded-md bg-surface-700 border-surface-600 text-foreground"
                        >
                    </div>
                </div>
            </CommonForm>

            <h3 class="text-xl font-bold mb-4">
                Projects List
            </h3>
            <Button
                class="mb-4"
                @click="changeMode('add')"
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
                            @click="editProject(project)"
                        >
                            Edit
                        </Button>
                    </div>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>Please log in to access the admin dashboard.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue'

    import { useSupabaseClient, useSupabaseUser } from '#imports'

    import type { RealtimeChannel } from '@supabase/supabase-js'
    import type { Props as FormProps } from '~/components/common/Form.vue'
    import type { Database, Tables } from '~/types/database.types'

    const supabaseClient = useSupabaseClient<Database>()
    const supabaseUser = useSupabaseUser()

    let realtimeChannel: RealtimeChannel

    onMounted(async () => {
        if (!supabaseUser.value) await navigateTo('login')

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

    const resetProjectModel = {
        title: '',
        description: '',
        image: '',
        github_url: ''
    } as Partial<Tables<'projects'>>

    const currentProject = ref({ ...resetProjectModel })
    const mode = ref<FormProps['mode']>('add')

    function changeMode(newMode: FormProps['mode']) {
        mode.value = newMode
        currentProject.value = { ...resetProjectModel }
    }

    /**
     * Add a new project to the database
     */
    async function addProject() {
        await $fetch('/api/projects', {
            headers: useRequestHeaders([ 'cookie' ]),
            query: currentProject.value,
            method: 'post'
        })
        currentProject.value = { ...resetProjectModel }
    }
    function editProject(project: Tables<'projects'>) {
        changeMode('edit')
        currentProject.value = { ...project }
    }
    /**
     * Patch a project in the database
     */
    async function patchProject(data: typeof resetProjectModel) {
        await $fetch('/api/projects', {
            headers: useRequestHeaders([ 'cookie' ]),
            query: { ...data },
            method: 'patch'
        })
    }
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
    /**
     * Log out the current user
     */
    async function logout() {
        supabaseClient.auth.signOut({})
        await navigateTo('/login')
    }
</script>
