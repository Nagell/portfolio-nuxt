<template>
    <CommonAddEditFormWrapper
        v-if="currentProject"
        :mode="mode"
        title="project"
        description="Make changes to your projects here. Click save when you're done."
        :is-verified="useIsFormValid().value"
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
        <FormField name="image">
            <FormItem class="flex flex-col">
                <FormLabel>Image</FormLabel>
                <Popover>
                    <PopoverTrigger as-child>
                        <FormControl>
                            <Button
                                type="button"
                                variant="outline"
                                role="combobox"
                                :class="cn('w-[200px] justify-between', !values.image && 'text-muted-foreground')"
                            >
                                {{ filterImageName }}
                                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent class="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Select an image" />
                            <CommandEmpty>Nothing found.</CommandEmpty>
                            <CommandList>
                                <CommandGroup>
                                    <CommandItem
                                        v-for="image in images"
                                        :key="image.id"
                                        :value="image.name"
                                        @select="() => setFieldValue('image', useGetPublicURL(image.name))"
                                    >
                                        <Check
                                            :class="cn('mr-2 h-4 w-4', image.name === filterImageName ? 'opacity-100' : 'opacity-0')"
                                        />
                                        {{ image.name }}
                                    </CommandItem>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
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
    import {
        Check,
        ChevronsUpDown
    } from 'lucide-vue-next'
    import { useForm, useIsFormValid } from 'vee-validate'

    import { cn } from '~/lib/utils'
    import { publicProjectsInsertSchemaSchema } from '~/types/schemas'

    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { ProjectCover } from '~/types/files.types'
    import type { PatchProjectQuery, PostProjectQuery, Project } from '~/types/projects.types'

    interface Props {
        currentProject: Project | {}
        mode: FormProps['mode']
    }

    const props = defineProps<Props>()

    const formSchema = toTypedSchema(
        publicProjectsInsertSchemaSchema
    )

    const { handleSubmit, resetForm, setFieldValue, values } = useForm({
        validationSchema: formSchema,
        keepValuesOnUnmount: true
    })

    /** =======================
     * FORM
     */

    // when mounting or reopening the form, set the form values
    onMounted(() => {
        resetForm({ values: { ...props.currentProject } }, { force: true })
    })
    watch(props, (value) => {
        resetForm({ values: { ...value.currentProject } }, { force: true })
    }, { deep: true })

    /** Submit the form */
    const onSubmit = handleSubmit(async (data) => {
        if (props.mode === 'add') {
            await addProject(data)
        }
        else {
            await patchProject(data as PatchProjectQuery)
        }
    })
    /** Add a new project row to the database */
    async function addProject(data: PostProjectQuery) {
        await $fetch('/api/projects', {
            headers: useRequestHeaders([ 'cookie' ]),
            query: data,
            method: 'post'
        })
    }
    /** Patch a project row in the database */
    async function patchProject(data: PatchProjectQuery) {
        await $fetch('/api/projects', {
            headers: useRequestHeaders([ 'cookie' ]),
            query: data,
            method: 'patch'
        })
    }

    // =======================
    // IMAGES

    const images = ref<ProjectCover[]>([])

    // when opening the form, fetch the list of images
    onMounted(async () => {
        await listImages().then((data) => {
            images.value = data
        })
    })

    /** Fetch the list of images */
    async function listImages() {
        const images = await $fetch<ProjectCover[]>('/api/project-covers/list', {
            headers: useRequestHeaders([ 'cookie' ]),
            method: 'get'
        })
        return images
    }
    /** Filter the image name */
    const filterImageName = computed(() => {
        if (!images.value.length) return 'No images found'

        return images.value.find(
            image => decodeURIComponent(values.image?.split('/').pop() || '') === image.name,
        )?.name || 'Select an image'
    })

</script>
