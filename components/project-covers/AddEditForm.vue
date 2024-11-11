<template>
    <SheetContent>
        <SheetHeader>
            <SheetTitle>{{ mode === 'edit' ? 'Edit' : 'Add' }} project cover</SheetTitle>
            <SheetDescription>
                Make changes to your project covers here. Click save when you're done.
            </SheetDescription>
        </SheetHeader>
        <CommonAddEditFormWrapper
            v-if="isFormOpen"
            :mode="mode"
            @submit="onSubmit"
        >
            <template v-if="mode === 'edit' && currentProjectCover">
                <CommonImageWithProps
                    class="mt-4"
                    :image="currentProjectCover"
                />
            </template>
            <FormField
                v-slot="{ componentField }"
                name="files"
            >
                <FormItem class="mt-4">
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                        <Input
                            type="file"
                            @change="componentField.onChange($event.target.files)"
                            @blur="componentField.onBlur($event.target.files)"
                        />
                        <FormDescription>
                            Choosing a file with different name will create a new one
                        </FormDescription>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
        </CommonAddEditFormWrapper>
    </SheetContent>
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

    type FormSchema = { files?: FileList }
    const formSchema = toTypedSchema(z.object({
        files: z.any()
            .refine(files => files?.length == 1, 'Image is required.')
            .refine(files => files?.[0]?.size <= $const.covers.MAX_FILE_SIZE,
                    `Max file size is ${$const.covers.MAX_FILE_SIZE / 1024 / 1024} MB.`)
            .refine(
                files => $const.covers.ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
                '.jpg, .jpeg, .png and .webp files are accepted.'
            ),
    }))

    const { handleSubmit, resetForm } = useForm({
        validationSchema: formSchema,
    })

    // when opening the form, set the local copy of the current project cover
    watch(props, (value) => {
        resetForm({ values: { files: value.currentProjectCover ?? undefined } }, { force: true })
    }, { deep: true })

    /** Submit the form */
    const onSubmit = handleSubmit((data: FormSchema) => {
        if (props.mode === 'add') {
            addProjectCover(data)
        }
        else {
            patchProjectCover(data)
        }
    })
    /** Add a new project to the database */
    async function addProjectCover(data: FormSchema) {
        const formData = new FormData()
        const files = data.files as FileList
        const file = files[0]

        formData.append('file', file)

        await $fetch('/api/project-covers', {
            headers: useRequestHeaders([ 'cookie' ]),
            body: formData,
            method: 'post'
        })
        isFormOpen.value = false
    }

    /** Patch a project in the database */
    async function patchProjectCover(data: FormSchema) {
        const formData = new FormData()
        const files = data.files as FileList
        const file = files[0]

        formData.append('file', file)

        await $fetch('/api/project-covers', {
            headers: useRequestHeaders([ 'cookie' ]),
            body: formData,
            method: 'patch'
        })
        isFormOpen.value = false
    }
</script>
