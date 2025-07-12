<template>
    <CommonAddEditFormWrapper
        v-if="currentProject"
        :mode="mode"
        title="project"
        description="Make changes to your projects here. Click save when you're done."
        :is-verified="useIsFormValid().value"
        :data-testid="testIds.admin.projects.dialog.wrapper"
        :button-test-id="testIds.admin.projects.dialog.saveButton"
        @submit="onSubmit"
    >
        <FormField
            v-slot="{ componentField }"
            :name="pickField('title')"
        >
            <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                    <Input
                        type="text"
                        placeholder="Project title"
                        v-bind="componentField"
                        :data-testid="testIds.admin.projects.dialog.title"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField
            v-slot="{ componentField }"
            :name="pickField('description')"
        >
            <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                    <Textarea
                        type="text"
                        placeholder="Project description"
                        v-bind="componentField"
                        rows="25"
                        :data-testid="testIds.admin.projects.dialog.description"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField :name="pickField('image')">
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
                                :data-testid="testIds.admin.projects.dialog.image"
                            >
                                {{ filterImageName }}
                                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                        class="w-[200px] p-0"
                    >
                        <Command>
                            <CommandInput
                                placeholder="Select an image"
                                :data-testid="testIds.admin.projects.dialog.imagePopover"
                            />
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
            :name="pickField('url')"
        >
            <FormItem>
                <FormLabel>GitHub URL</FormLabel>
                <FormControl>
                    <Input
                        type="url"
                        placeholder="GitHub URL"
                        v-bind="componentField"
                        :data-testid="testIds.admin.projects.dialog.url"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField
            v-slot="{ value }"
            :name="pickField('tags')"
        >
            <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                    <TagsInput :model-value="value">
                        <TagsInputItem
                            v-for="item in value"
                            :key="item"
                            :value="item"
                        >
                            <TagsInputItemText />
                            <TagsInputItemDelete />
                        </TagsInputItem>

                        <TagsInputInput
                            placeholder="Add tags"
                            :data-testid="testIds.admin.projects.dialog.tags"
                        />
                    </TagsInput>
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
    </CommonAddEditFormWrapper>
</template>

<script setup lang="ts">
    import { toTypedSchema } from '@vee-validate/zod'
    import { Check, ChevronsUpDown } from 'lucide-vue-next'
    import { useForm, useIsFormValid } from 'vee-validate'

    import { publicProjectsInsertSchema } from '~/types/schemas'
    import testIds from '~/utils/testIds'

    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { Asset } from '~/types/files.types'
    import type { PatchProjectQuery, PostProjectQuery, Project } from '~/types/projects.types'

    interface Props {
        currentProject: Project | {}
        mode: FormProps['mode']
    }

    const props = defineProps<Props>()

    /** =======================
     * FORM
     */
    const formSchema = toTypedSchema(
        publicProjectsInsertSchema
    )

    const { handleSubmit, resetForm, setFieldValue, values } = useForm({
        validationSchema: formSchema,
        keepValuesOnUnmount: true
    })

    const { pickField } = useZodFieldPicker(publicProjectsInsertSchema)

    // when mounting or reopening the form, set the form values
    onMounted(() => reset(props.currentProject))
    watch(props, value => reset(value.currentProject), { deep: true })

    function reset(data: Project | {}) {
        resetForm({ values: { tags: [], ...data } }, { force: true })
    }

    const emits = defineEmits < {
        submit: [PostProjectQuery | PatchProjectQuery]
    } > ()

    /** Submit the form */
    const onSubmit = handleSubmit(async (data) => {
        emits('submit', data)
    })

    // =======================
    // IMAGES

    const images = ref<Asset[]>([])

    // when opening the form, fetch the list of assets and pick only the images
    onMounted(async () => {
        await listAssets().then((data) => {
            images.value = data.filter(asset => isImage(asset))
        })
    })

    /** Fetch the list of assets */
    async function listAssets() {
        const images = await $fetch<Asset[]>('/api/assets/list', {
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
