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
    import type { Experience, PatchExperienceQuery, PostExperienceQuery } from '~~/types/experience.types'

    async function submit(data: PostExperienceQuery | PatchExperienceQuery) {
        try {
            await onSubmit({ query: data })
            await refreshNuxtData('experience')
        }
        finally {
            setIsFormOpen(false)
        }
    }

    const { isFormOpen, currentItem, formMode, onSubmit, setIsFormOpen, setFormData }
        = useAddEditForm<Experience, PostExperienceQuery, PatchExperienceQuery>({
            url: '/api/experience',
        })
</script>
