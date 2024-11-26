<template>
    <div>
        <Sheet>
            <AdminExperienceAddEditForm
                v-if="isFormOpen"
                :current-experience="currentExperience"
                :mode="addEditFormMode"
            />
            <AdminExperienceList @open-form="openAddEditForm" />
        </Sheet>
    </div>
</template>

<script setup lang="ts">
    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { Experience } from '~/types/experience.types'

    const isFormOpen = ref(false)
    const addEditFormMode = ref<FormProps['mode']>('add')
    const currentExperience = ref<Experience | {}>({})

    function openAddEditForm(event: { mode: FormProps['mode'], experience?: Experience }) {
        isFormOpen.value = true
        addEditFormMode.value = event.mode
        currentExperience.value = event.experience ?? {}
    }
</script>
