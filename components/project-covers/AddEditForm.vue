<template>
    <CommonAddEditFormWrapper
        v-if="isFormOpen"
        :mode="mode"
        @submit="onSubmit"
    >
        <FormField
            v-slot="{ componentField }"
            name="file"
        >
            <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                    <Input
                        type="file"
                        placeholder="Project title"
                        @change="componentField.onChange($event.target.files)"
                        @blur="componentField.onBlur($event.target.files)"
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

    import type { FileObject } from '@supabase/storage-js'
    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'

    const { $const } = useNuxtApp()

    interface Props {
        currentProjectCover?: FileObject
        mode: FormProps['mode']
    }

    const props = defineProps<Props>()
    const isFormOpen = defineModel<boolean>('isFormOpen')

    type FormSchema = { file?: FileList }
    const formSchema = toTypedSchema(z.object({
        file: z.any()
            .refine(files => files?.length == 1, 'Image is required.')
            .refine(files => files?.[0]?.size <= $const.covers.MAX_FILE_SIZE, `Max file size is 5MB.`)
            .refine(
                files => $const.covers.ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
                '.jpg, .jpeg, .png and .webp files are accepted.'
            ),
    }))

    const { handleSubmit, resetForm } = useForm({
        validationSchema: formSchema,
    })

    // when opening the form, set the local copy of the current project
    watch(props, (value) => {
        resetForm({ values: { file: value.currentProjectCover ?? undefined } }, { force: true })
    }, { deep: true })

    /**
     * Submit the form
     */
    const onSubmit = handleSubmit((data: FormSchema) => {
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
    async function addProject(data: FormSchema) {
        await $fetch('/api/project-covers', {
            headers: useRequestHeaders([ 'cookie' ]),
            query: { file: data.file?.[0], name: data.file?.[0].name },
            method: 'post'
        })
        isFormOpen.value = false
    }

    /**
     * Patch a project in the database
     */
    async function patchProject(data: FormSchema) {
        await $fetch('/api/project-covers', {
            headers: useRequestHeaders([ 'cookie' ]),
            query: data.file,
            method: 'patch'
        })
        isFormOpen.value = false
    }
</script>
