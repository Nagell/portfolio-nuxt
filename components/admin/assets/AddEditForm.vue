<template>
    <CommonAddEditFormWrapper
        :mode="mode"
        title="assets"
        description="Make changes to your assets here. Click save when you're done."
        :is-verified="useIsFormValid().value"
        @submit="onSubmit"
    >
        <template v-if="mode === 'edit' && currentAsset">
            <CommonAssetWithProps
                class="mt-4"
                :asset="currentAsset"
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
                        :accept="$const.assets.ACCEPTED_FILE_TYPES"
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
    import { useForm, useIsFormValid } from 'vee-validate'
    import * as z from 'zod'

    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { Asset } from '~/types/files.types'

    const { $const } = useNuxtApp()

    interface Props {
        currentAsset?: Asset
        mode: FormProps['mode']
    }

    const props = defineProps<Props>()

    const formSchema = toTypedSchema(z.object({
        files: z.instanceof(FileList)
            .refine(files => files?.length, 'No files selected.')
            .transform(files => Array.from(files))
            .refine(files => files.every(file => file.size <= $const.assets.MAX_FILE_SIZE),
                    `Max file size is ${$const.assets.MAX_FILE_SIZE / 1024 / 1024} MB.`)
            .refine(
                files => files.every(file => $const.assets.ACCEPTED_MIME_TYPES.includes(file.type)),
                `${$const.assets.ACCEPTED_FILE_TYPES} files are accepted.`
            ),
    }))

    const { handleSubmit, resetForm } = useForm({
        validationSchema: formSchema,
        keepValuesOnUnmount: true
    })

    /** =======================
     * FORM
     */

    // when mounting or reopening the form, set the form values
    onMounted(() => reset())
    watch(props, () => reset(), { deep: true })

    function reset() {
        resetForm({ values: { files: [] } }, { force: true })
    }

    type FormValues = { files: File[] }

    /** Submit the form */
    const onSubmit = handleSubmit(async (data: FormValues) => {
        const files = data.files
        const formData = new FormData()

        files.forEach((file) => {
            formData.append('file', file)
        })

        props.mode === 'add'
            ? await addAsset(formData)
            : await patchAsset(formData)
    })
    /** Add a new asset file to the bucket */
    async function addAsset(data: FormData) {
        await $fetch('/api/assets', {
            headers: useRequestHeaders([ 'cookie' ]),
            body: data,
            method: 'post'
        })
    }
    /** Patch a asset file in the bucket */
    async function patchAsset(data: FormData) {
        await $fetch('/api/assets', {
            headers: useRequestHeaders([ 'cookie' ]),
            body: data,
            method: 'patch'
        })
    }
</script>
