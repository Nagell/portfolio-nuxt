<template>
    <!-- TODO: Move to dialog or panel -->
    <CommonForm
        v-if="open && localCurrentProject"
        :post="() => addProject(localCurrentProject)"
        :patch="() => patchProject(localCurrentProject)"
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
                    v-model="localCurrentProject.title"
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
                    v-model="localCurrentProject.description"
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
                    v-model="localCurrentProject.image"
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
                    v-model="localCurrentProject.github_url"
                    type="url"
                    required
                    class="mt-1 block w-full rounded-md bg-surface-700 border-surface-600 text-foreground"
                >
            </div>
        </div>
    </CommonForm>
</template>

<script setup lang="ts">
    import type { Props as FormProps } from '~/components/common/Form.vue'
    import type { Tables } from '~/types/database.types'

    interface ProjectFormProps {
        currentProject: Partial<Tables<'projects'>>
        mode: FormProps['mode']
    }

    const open = defineModel<boolean>()
    const props = defineProps<ProjectFormProps>()

    // const resetProjectModel = {
    //     title: '',
    //     description: '',
    //     image: '',
    //     github_url: ''
    // } as Partial<Tables<'projects'>>

    // when opening the form, set the local copy of the current project
    const localCurrentProject = ref<Partial<Tables<'projects'>>>({})

    watch(props, (value) => {
        if (value) {
            localCurrentProject.value = { ...props.currentProject }
        }
    }, { deep: true })

    /**
     * Add a new project to the database
     */
    async function addProject(data: Partial<Tables<'projects'>>) {
        await $fetch('/api/projects', {
            headers: useRequestHeaders([ 'cookie' ]),
            query: data,
            method: 'post'
        })
        open.value = false
    }

    /**
     * Patch a project in the database
     */
    async function patchProject(data: Partial<Tables<'projects'>>) {
        await $fetch('/api/projects', {
            headers: useRequestHeaders([ 'cookie' ]),
            query: data,
            method: 'patch'
        })
        open.value = false
    }

</script>
