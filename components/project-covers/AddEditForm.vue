<template>
    <CommonAddEditFormWrapper
        :mode="mode"
        title="project cover"
        description="Make changes to your project covers here. Click save when you're done."
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
                        :accept="$const.covers.ACCEPTED_IMAGE_TYPES"
                        multiple
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
</template>

<script setup lang="ts">
    import { toTypedSchema } from '@vee-validate/zod'
    import { useForm } from 'vee-validate'
    import * as z from 'zod'

    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { ProjectCover } from '~/types/files.types'

    const { $const } = useNuxtApp()

    interface Props {
        currentProjectCover?: ProjectCover
        mode: FormProps['mode']
    }

    const props = defineProps<Props>()

    const formSchema = toTypedSchema(z.object({
        files: z.instanceof(FileList)
            .refine(files => files?.length, 'No files selected.')
            .transform(files => Array.from(files))
            .refine(files => files.every(file => file.size <= $const.covers.MAX_FILE_SIZE),
                    `Max file size is ${$const.covers.MAX_FILE_SIZE / 1024 / 1024} MB.`)
            .refine(
                files => files.every(file => $const.covers.ACCEPTED_IMAGE_TYPES_MIME.includes(file.type)),
                `${$const.covers.ACCEPTED_IMAGE_TYPES} files are accepted.`
            ),
    }))

    const { handleSubmit, resetForm } = useForm({
        validationSchema: formSchema,
        keepValuesOnUnmount: true
    })

    /** =======================
     * FORM
     */

    // when opening the form, reset the form
    onMounted(() => {
        resetForm({ values: { files: [] } }, { force: true })
    })
    watch(props, () => {
        resetForm({ values: { files: [] } }, { force: true })
    }, { deep: true })

    type FormValues = { files: File[] }

    /** Submit the form */
    const onSubmit = handleSubmit(async (data: FormValues) => {
        if (props.mode === 'add') {
            await addProjectCover(data.files)
        }
        else {
            await patchProjectCover(data.files)
        }
    })
    /** Add a new project cover file to the bucket */
    async function addProjectCover(files: File[]) {
        const formData = new FormData()

        files.forEach((file) => {
            formData.append('file', file)
        })

        await $fetch('/api/project-covers', {
            headers: useRequestHeaders([ 'cookie' ]),
            body: formData,
            method: 'post'
        })
    }

    /** Patch a project cover file in the bucket */
    async function patchProjectCover(files: File[]) {
        const formData = new FormData()

        files.forEach((file) => {
            formData.append('file', file)
        })

        await $fetch('/api/project-covers', {
            headers: useRequestHeaders([ 'cookie' ]),
            body: formData,
            method: 'patch'
        })
    }
</script>
