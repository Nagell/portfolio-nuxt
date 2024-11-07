<template>
    <div>
        <ProjectAddEditForm
            v-model:is-form-open="isFormOpen"
            :current-project="currentProject"
            :mode="addEditFormMode"
        />
        <ProjectList @open-form="openAddEditForm" />
    </div>
</template>

<script setup lang="ts">
    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { Tables } from '~/types/database.types'

    const isFormOpen = ref(false)
    const addEditFormMode = ref<FormProps['mode']>('add')
    const currentProject = ref<Partial<Tables<'projects'>>>({})

    function openAddEditForm(event: { mode: FormProps['mode'], project?: Tables<'projects'> }) {
        isFormOpen.value = true
        addEditFormMode.value = event.mode
        currentProject.value = event.project ?? {}
    }
</script>
