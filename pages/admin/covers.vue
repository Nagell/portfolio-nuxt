<template>
    <div>
        <Sheet>
            <AdminProjectCoversAddEditForm
                v-if="isFormOpen"
                :current-project-cover="currentProjectCover"
                :mode="addEditFormMode"
            />
            <AdminProjectCoversList @open-form="openAddEditForm" />
        </Sheet>
    </div>
</template>

<script setup lang="ts">
    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { ProjectCover } from '~/types/files.types'

    const isFormOpen = ref(false)
    const addEditFormMode = ref<FormProps['mode']>('add')
    const currentProjectCover = ref<ProjectCover>()

    function openAddEditForm(event: { mode: FormProps['mode'], projectCover?: ProjectCover }) {
        isFormOpen.value = true
        addEditFormMode.value = event.mode
        currentProjectCover.value = event.projectCover ?? undefined
    }
</script>
