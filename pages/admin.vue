<template>
    <div class="container mx-auto px-4 py-16">
        <h1 class="text-4xl font-bold mb-8">
            Admin Dashboard
        </h1>
        <div v-if="user">
            <h2 class="text-2xl font-bold mb-4">
                Manage Projects
            </h2>
            <form
                class="mb-8"
                @submit.prevent="addProject"
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
                            v-model="newProject.title"
                            type="text"
                            required
                            class="mt-1 block w-full rounded-md bg-surface-700 border-surface-600 text-white"
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
                            v-model="newProject.description"
                            required
                            class="mt-1 block w-full rounded-md bg-surface-700 border-surface-600 text-white"
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
                            v-model="newProject.image"
                            type="url"
                            required
                            class="mt-1 block w-full rounded-md bg-surface-700 border-surface-600 text-white"
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
                            v-model="newProject.github_url"
                            type="url"
                            required
                            class="mt-1 block w-full rounded-md bg-surface-700 border-surface-600 text-white"
                        >
                    </div>
                </div>
                <button
                    type="submit"
                    class="mt-4 bg-primary text-surface-950 px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-300"
                >
                    Add Project
                </button>
            </form>

            <h3 class="text-xl font-bold mb-4">
                Existing Projects
            </h3>
            <ul>
                <li
                    v-for="project in projects"
                    :key="project.id"
                    class="mb-4 p-4 bg-surface-800 rounded-lg"
                >
                    <h4 class="text-lg font-bold">
                        {{ project.title }}
                    </h4>
                    <p>{{ project.description }}</p>
                    <button
                        class="mt-2 bg-red-600 text-surface-950 px-2 py-1 rounded-md hover:bg-opacity-90 transition duration-300"
                        @click="deleteProject(project.id)"
                    >
                        Delete
                    </button>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>Please log in to access the admin dashboard.</p>
            <button
                class="mt-4 bg-primary text-surface-950 px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-300"
                @click="login"
            >
                Log In
            </button>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'

    import { useSupabaseClient, useSupabaseUser } from '#imports'

    const supabase = useSupabaseClient()
    const user = useSupabaseUser()

    const projects = ref([])
    const newProject = ref({
        title: '',
        description: '',
        image: '',
        github_url: ''
    })

    onMounted(async () => {
        if (user.value) {
            await fetchProjects()
        }
    })

    async function fetchProjects() {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching projects:', error)
        }
        else {
            projects.value = data
        }
    }

    async function addProject() {
        const { data, error } = await supabase
            .from('projects')
            .insert([ newProject.value ])

        if (error) {
            console.error('Error adding project:', error)
        }
        else {
            await fetchProjects()
            newProject.value = { title: '', description: '', image: '', github_url: '' }
        }
    }

    async function deleteProject(id) {
        const { error } = await supabase
            .from('projects')
            .delete()
            .match({ id })

        if (error) {
            console.error('Error deleting project:', error)
        }
        else {
            await fetchProjects()
        }
    }

    function login() {
        supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${window.location.origin}/admin`
            }
        })
    }
</script>
