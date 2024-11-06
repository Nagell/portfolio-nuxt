<template>
    <CommonAddEditFormWrapper
        v-if="isFormOpen && localCurrentProject"
        :mode="mode"
        @submit="onSubmit"
    >
        <FormField
            v-slot="{ componentField }"
            name="title"
        >
            <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                    <Input
                        type="text"
                        placeholder="Project title"
                        v-bind="componentField"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField
            v-slot="{ componentField }"
            name="description"
        >
            <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                    <Textarea
                        type="text"
                        placeholder="Project description"
                        v-bind="componentField"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField
            v-slot="{ componentField }"
            name="image"
        >
            <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                    <Input
                        type="url"
                        placeholder="Image URL"
                        v-bind="componentField"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField
            v-slot="{ componentField }"
            name="url"
        >
            <FormItem>
                <FormLabel>GitHub URL</FormLabel>
                <FormControl>
                    <Input
                        type="url"
                        placeholder="GitHub URL"
                        v-bind="componentField"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
    </CommonAddEditFormWrapper>
</template>

<script setup lang="ts">
    import { toTypedSchema } from '@vee-validate/zod'
    import { useForm } from 'vee-validate'
    import * as z from 'zod'

    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { Tables } from '~/types/database.types'

    interface Props {
        currentProject: Partial<Tables<'projects'>>
        mode: FormProps['mode']
    }

    const props = defineProps<Props>()
    const isFormOpen = defineModel<boolean>('isFormOpen')

    const localCurrentProject = ref<Partial<Tables<'projects'>>>({})

    // when opening the form, set the local copy of the current project
    watch(props, (value) => {
        resetForm({ values: { ...value.currentProject } }, { force: true })
    }, { deep: true })

    const formSchema = toTypedSchema(z.object({
        id: z.number().optional(),
        title: z.string().min(2).max(200),
        description: z.string().min(2).max(500),
        image: z.string().url(),
        url: z.string().url().nullish(),
    }))

    const { handleSubmit, resetForm } = useForm({
        validationSchema: formSchema,
    })
    const onSubmit = handleSubmit((data) => {
        if (props.mode === 'add') {
            addProject(data)
        }
        else {
            patchProject(data)
        }
    })

    /**
     * Add a new project to the database
     */
    async function addProject(data: Partial<Tables<'projects'>>) {
        await $fetch('/api/projects', {
            headers: useRequestHeaders([ 'cookie' ]),
            query: data,
            method: 'post'
        })
        isFormOpen.value = false
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
        isFormOpen.value = false
    }
</script>
