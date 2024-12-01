<template>
    <div>
        <Sheet>
            <AdminProjectAddEditForm
                v-if="isFormOpen"
                :current-project="currentItem"
                :mode="addEditFormMode"
                @submit="submit"
            />
            <AdminProjectList @open-form="openAddEditForm" />
        </Sheet>
    </div>
</template>

<script setup lang="ts">
    import type { PatchProjectQuery, PostProjectQuery, Project } from '~/types/projects.types'

    function submit(data: PostProjectQuery | PatchProjectQuery) {
        onSubmit({ query: data })
    }

    const { openAddEditForm, isFormOpen, currentItem, addEditFormMode, onSubmit }
        = useAddEditForm<Project, PostProjectQuery, PatchProjectQuery>({
            url: '/api/projects',
        })
</script>
