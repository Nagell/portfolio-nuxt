<template>
    <div>
        <Sheet>
            <ProjectAddEditForm
                v-if="isFormOpen"
                :current-project="currentProject"
                :mode="addEditFormMode"
            />
            <ProjectList @open-form="openAddEditForm" />
        </Sheet>
    </div>
</template>

<script setup lang="ts">
    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { Project } from '~/types/projects.types'

    const isFormOpen = ref(false)
    const addEditFormMode = ref<FormProps['mode']>('add')
    const currentProject = ref<Project | {}>({})

    function openAddEditForm(event: { mode: FormProps['mode'], project?: Project }) {
        isFormOpen.value = true
        addEditFormMode.value = event.mode
        currentProject.value = event.project ?? {}
    }
</script>
