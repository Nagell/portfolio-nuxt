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
    import { useToast } from '~/components/ui/toast'

    import type { PatchProjectQuery, PostProjectQuery, Project } from '~~/types/projects.types'

    const { toast } = useToast()

    async function submit(data: PostProjectQuery | PatchProjectQuery) {
        try {
            await onSubmit({ query: data })
            await refreshNuxtData('projects')
            setIsFormOpen(false)
        }
        catch (error) {
            console.error('Failed to save project:', error)
            toast({ title: 'Error', description: 'Failed to save project. Please try again.', variant: 'destructive' })
        }
    }

    const { isFormOpen, currentItem, formMode, onSubmit, setIsFormOpen, setFormData }
        = useAddEditForm<Project, PostProjectQuery, PatchProjectQuery>({
            url: '/api/projects',
        })
</script>
