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
    import { toast } from '~/components/ui/sonner'

    import type { PatchProjectQuery, PostProjectQuery, Project } from '~~/types/projects.types'

    async function submit(data: PostProjectQuery | PatchProjectQuery) {
        try {
            await onSubmit({ query: data })
            setIsFormOpen(false)
        }
        catch (error) {
            console.error('Failed to save project:', error)
            toast.error('Failed to save project. Please try again.')
            return
        }

        try {
            await refreshNuxtData('projects')
        }
        catch (error) {
            console.error('Failed to refresh project list:', error)
        }
    }

    const { isFormOpen, currentItem, formMode, onSubmit, setIsFormOpen, setFormData }
        = useAddEditForm<Project, PostProjectQuery, PatchProjectQuery>({
            url: '/api/projects',
        })
</script>
