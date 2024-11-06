<template>
    <div>
        <ProjectAddEditForm
            v-model="isFormOpen"
            :current-project="currentProject"
            :mode="addEditFormMode"
        />
        <ProjectList @open-form="openAddEditForm" />
    </div>
</template>

<script setup lang="ts">
    import type { Tables } from '~/types/database.types'

    const isFormOpen = ref(false)
    const addEditFormMode = ref<'add' | 'edit'>('add')
    const currentProject = ref<Partial<Tables<'projects'>>>({})

    function openAddEditForm(event: { mode: 'add' | 'edit', project?: Tables<'projects'> }) {
        console.log('openAddEditForm', event)

        isFormOpen.value = true
        addEditFormMode.value = event.mode
        currentProject.value = event.project ?? {}
    }
</script>
