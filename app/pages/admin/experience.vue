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
    import { toast } from '~/components/ui/sonner'

    import type { Experience, PatchExperienceQuery, PostExperienceQuery } from '~~/types/experience.types'

    async function submit(data: PostExperienceQuery | PatchExperienceQuery) {
        try {
            await onSubmit({ query: data })
            setIsFormOpen(false)
        }
        catch (error) {
            console.error('Failed to save experience:', error)
            toast.error('Failed to save experience. Please try again.')
            return
        }

        try {
            await refreshNuxtData('experience')
        }
        catch (error) {
            console.error('Failed to refresh experience list:', error)
        }
    }

    const { isFormOpen, currentItem, formMode, onSubmit, setIsFormOpen, setFormData }
        = useAddEditForm<Experience, PostExperienceQuery, PatchExperienceQuery>({
            url: '/api/experience',
        })
</script>
