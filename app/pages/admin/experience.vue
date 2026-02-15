<template>
    <div>
        <Sheet
            :open="isFormOpen"
            @update:open="setIsFormOpen"
        >
            <AdminExperienceAddEditForm
                v-if="isFormOpen"
                :current-experience="currentItem"
                :mode="formMode"
                @submit="submit"
            />
            <AdminExperienceList @set-form-data="setFormData" />
        </Sheet>
    </div>
</template>

<script setup lang="ts">
    import { useToast } from '~/components/ui/toast'

    import type { Experience, PatchExperienceQuery, PostExperienceQuery } from '~~/types/experience.types'

    const { toast } = useToast()

    async function submit(data: PostExperienceQuery | PatchExperienceQuery) {
        try {
            await onSubmit({ query: data })
            await refreshNuxtData('experience')
            setIsFormOpen(false)
        }
        catch (error) {
            console.error('Failed to save experience:', error)
            toast({ title: 'Error', description: 'Failed to save experience. Please try again.', variant: 'destructive' })
        }
    }

    const { isFormOpen, currentItem, formMode, onSubmit, setIsFormOpen, setFormData }
        = useAddEditForm<Experience, PostExperienceQuery, PatchExperienceQuery>({
            url: '/api/experience',
        })
</script>
