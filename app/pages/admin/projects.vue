<template>
    <div>
        <Sheet
            :open="isFormOpen"
            @update:open="setIsFormOpen"
        >
            <AdminProjectAddEditForm
                v-if="isFormOpen"
                :current-project="currentItem"
                :mode="formMode"
                @submit="submit"
            />
            <AdminProjectList @set-form-data="setFormData" />
        </Sheet>
    </div>
</template>

<script setup lang="ts">
    import type { PatchProjectQuery, PostProjectQuery, Project } from '~~/types/projects.types'

    async function submit(data: PostProjectQuery | PatchProjectQuery) {
        try {
            await onSubmit({ query: data })
            await refreshNuxtData('projects')
        }
        finally {
            setIsFormOpen(false)
        }
    }

    const { isFormOpen, currentItem, formMode, onSubmit, setIsFormOpen, setFormData }
        = useAddEditForm<Project, PostProjectQuery, PatchProjectQuery>({
            url: '/api/projects',
        })
</script>
