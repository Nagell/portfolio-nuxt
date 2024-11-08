<template>
    <div>
        <ProjectCoversAddEditForm
            v-model:is-form-open="isFormOpen"
            :current-project-cover="currentProjectCover"
            :mode="addEditFormMode"
        />
        <ProjectCoversList @open-form="openAddEditForm" />
    </div>
</template>

<script setup lang="ts">
    import type { FileObject } from '@supabase/storage-js'
    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'

    const isFormOpen = ref(false)
    const addEditFormMode = ref<FormProps['mode']>('add')
    const currentProjectCover = ref<FileObject>()

    function openAddEditForm(event: { mode: FormProps['mode'], projectCover?: FileObject }) {
        isFormOpen.value = true
        addEditFormMode.value = event.mode
        currentProjectCover.value = event.projectCover ?? undefined
    }
</script>
