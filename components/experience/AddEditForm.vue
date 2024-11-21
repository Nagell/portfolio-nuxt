<template>
    <SheetContent>
        <SheetHeader>
            <SheetTitle>{{ mode === 'edit' ? 'Edit' : 'Add' }} experience</SheetTitle>
            <SheetDescription>
                Make changes to your experiences here. Click save when you're done.
            </SheetDescription>
        </SheetHeader>
        <CommonAddEditFormWrapper
            v-if="currentExperience"
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
                            placeholder="Experience title"
                            v-bind="componentField"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField
                v-slot="{ componentField }"
                name="link"
            >
                <FormItem>
                    <FormLabel>Company URL</FormLabel>
                    <FormControl>
                        <Input
                            type="url"
                            placeholder="Company URL"
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
                            placeholder="Experience description"
                            v-bind="componentField"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField
                v-slot="{ componentField }"
                name="start"
            >
                <FormItem>
                    <FormLabel>Start date</FormLabel>
                    <FormControl>
                        <Textarea
                            type="text"
                            placeholder="Start date"
                            v-bind="componentField"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField
                v-slot="{ componentField }"
                name="end"
            >
                <FormItem>
                    <FormLabel>End date</FormLabel>
                    <FormControl>
                        <Textarea
                            type="text"
                            placeholder="End date"
                            v-bind="componentField"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField
                v-slot="{ componentField }"
                name="tags"
            >
                <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                        <Textarea
                            type="text"
                            placeholder="tags"
                            v-bind="componentField"
                        />
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

    import { publicExperienceInsertSchemaSchema, publicExperienceUpdateSchemaSchema } from '~/types/schemas'

    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { Experience, PatchExperienceQuery, PostExperienceQuery } from '~/types/experience.types'

    interface Props {
        currentExperience: Experience | {}
        mode: FormProps['mode']
    }

    const props = defineProps<Props>()

    const formSchema = toTypedSchema(z.intersection(
        publicExperienceInsertSchemaSchema,
        publicExperienceUpdateSchemaSchema
    ))

    const { handleSubmit, resetForm } = useForm({
        validationSchema: formSchema,
        keepValuesOnUnmount: true
    })

    /** =======================
     * FORM
     */

    // when mounting or reopening the form, set the form values
    onMounted(() => {
        resetForm({ values: { ...props.currentExperience } }, { force: true })
    })
    watch(props, (value) => {
        resetForm({ values: { ...value.currentExperience } }, { force: true })
    }, { deep: true })

    /** Submit the form */
    const onSubmit = handleSubmit(async (data) => {
        if (props.mode === 'add') {
            await addExperience(data)
        }
        else {
            await patchExperience(data as PatchExperienceQuery)
        }
    })
    /** Add a new experience row to the database */
    async function addExperience(data: PostExperienceQuery) {
        await $fetch('/api/experience', {
            headers: useRequestHeaders([ 'cookie' ]),
            query: data,
            method: 'post'
        })
    }

    /** Patch an experience row in the database */
    async function patchExperience(data: PatchExperienceQuery) {
        await $fetch('/api/experience', {
            headers: useRequestHeaders([ 'cookie' ]),
            query: data,
            method: 'patch'
        })
    }
</script>
