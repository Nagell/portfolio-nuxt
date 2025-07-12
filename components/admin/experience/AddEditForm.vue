<template>
    <CommonAddEditFormWrapper
        v-if="currentExperience"
        :mode="mode"
        title="experience"
        description="Make changes to your experiences here. Click save when you're done."
        :is-verified="useIsFormValid().value"
        :data-testid="testIds.admin.experience.dialog.wrapper"
        :button-test-id="testIds.admin.experience.dialog.saveButton"
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
                        placeholder="Experience title"
                        v-bind="componentField"
                        :data-testid="testIds.admin.experience.dialog.title"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField
            v-slot="{ componentField }"
            :name="pickField('link')"
        >
            <FormItem>
                <FormLabel>Company URL</FormLabel>
                <FormControl>
                    <Input
                        type="url"
                        placeholder="Company URL"
                        v-bind="componentField"
                        :data-testid="testIds.admin.experience.dialog.url"
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
                        placeholder="Experience description"
                        v-bind="componentField"
                        rows="25"
                        :data-testid="testIds.admin.experience.dialog.description"
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField
            :name="pickField('start')"
        >
            <FormItem class="flex flex-col">
                <FormLabel>Start date</FormLabel>
                <Popover>
                    <div class="flex gap-3 items-center">
                        <PopoverTrigger as-child>
                            <FormControl class="flex">
                                <Button
                                    variant="outline"
                                    :class="cn(
                                        'w-[240px] ps-3 text-start font-normal',
                                        !startDate && 'text-muted-foreground',
                                    )"
                                    :data-testid="testIds.admin.experience.dialog.startDate"
                                >
                                    <span>{{ startDate ? dateFormatter.format(toDate(startDate)) : "Pick a date" }}</span>
                                    <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                                </Button>
                                <input hidden>
                            </FormControl>
                        </PopoverTrigger>
                        <Button
                            role="deletion"
                            variant="outline"
                            :class="cn(
                                'p-2.5 text-start font-normal',
                            )"
                            @click="setFieldValue('start', undefined)"
                        >
                            <Trash class="w-4 h-4 text-muted-foreground" />
                        </Button>
                    </div>
                    <PopoverContent
                        class="w-auto p-0"
                        :data-testid="testIds.admin.experience.dialog.startDatePopover"
                    >
                        <Calendar
                            v-model:placeholder="startDatePlaceholder"
                            v-model="startDate"
                            calendar-label="Start date"
                            :min-value="new CalendarDate(1900, 1, 1)"
                            :max-value="today(getLocalTimeZone())"
                            @update:model-value="(v) => {
                                if (v) {
                                    setFieldValue('start', v.toString())
                                } else {
                                    setFieldValue('start', undefined)
                                }

                            }"
                        />
                    </PopoverContent>
                </Popover>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField
            :name="pickField('end')"
        >
            <FormItem class="flex flex-col">
                <FormLabel>End date</FormLabel>
                <Popover>
                    <div class="flex gap-3 items-center">
                        <PopoverTrigger as-child>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    :class="cn(
                                        'w-[240px] ps-3 text-start font-normal',
                                        !endDate && 'text-muted-foreground',
                                    )"
                                    :data-testid="testIds.admin.experience.dialog.endDate"
                                >
                                    <span>{{ endDate ? dateFormatter.format(toDate(endDate)) : "Pick a date" }}</span>
                                    <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
                                </Button>
                                <input hidden>
                            </FormControl>
                        </PopoverTrigger>
                        <Button
                            role="deletion"
                            variant="outline"
                            :class="cn(
                                'p-2.5 text-start font-normal',
                            )"
                            @click="setFieldValue('end', undefined)"
                        >
                            <Trash class="w-4 h-4 text-muted-foreground" />
                        </Button>
                    </div>
                    <PopoverContent
                        class="w-auto p-0"
                        :data-testid="testIds.admin.experience.dialog.endDatePopover"
                    >
                        <Calendar
                            v-model:placeholder="endDatePlaceholder"
                            v-model="endDate"
                            calendar-label="End date"
                            :min-value="new CalendarDate(1900, 1, 1)"
                            :max-value="today(getLocalTimeZone())"
                            @update:model-value="(v) => {
                                if (v) {
                                    setFieldValue('end', v.toString())
                                } else {
                                    setFieldValue('end', undefined)
                                }

                            }"
                        />
                    </PopoverContent>
                </Popover>
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
                            :data-testid="testIds.admin.experience.dialog.tags"
                        />
                    </TagsInput>
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
    </CommonAddEditFormWrapper>
</template>

<script setup lang="ts">
    import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date'
    import { toTypedSchema } from '@vee-validate/zod'
    import { CalendarIcon, Trash } from 'lucide-vue-next'
    import { toDate } from 'radix-vue/date'
    import { useForm, useIsFormValid } from 'vee-validate'

    import { publicExperienceInsertSchema } from '~/types/schemas'

    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { Experience, PatchExperienceQuery, PostExperienceQuery } from '~/types/experience.types'

    interface Props {
        currentExperience: Experience | {}
        mode: FormProps['mode']
    }

    const props = defineProps<Props>()

    /** =======================
     * FORM
     */
    const formSchema = toTypedSchema(
        publicExperienceInsertSchema
    )

    const { handleSubmit, resetForm, setFieldValue, values } = useForm({
        validationSchema: formSchema,
        keepValuesOnUnmount: true,
    })

    const { pickField } = useZodFieldPicker(publicExperienceInsertSchema)

    // when mounting or reopening the form, set the form values
    onMounted(() => reset(props.currentExperience))
    watch(props, value => reset(value.currentExperience), { deep: true })

    function reset(data: Experience | {}) {
        resetForm({ values: { tags: [], ...data } }, { force: true })
    }

    const emits = defineEmits < {
        submit: [PostExperienceQuery | PatchExperienceQuery]
    } > ()

    /** Submit the form */
    const onSubmit = handleSubmit(async (data) => {
        emits('submit', data)
    })

    /** =======================
     * DATE
     */

    const dateFormatter = new DateFormatter('en-US', {
        dateStyle: 'long',
    })

    const startDate = computed({
        get: () => values.start ? parseDate(values.start) : undefined,
        set: val => val,
    })

    const startDatePlaceholder = ref()

    const endDate = computed({
        get: () => values.end ? parseDate(values.end) : undefined,
        set: val => val,
    })

    const endDatePlaceholder = ref()
</script>
