<template>
    <div>
        <Sheet>
            <AdminExperienceAddEditForm
                v-if="isFormOpen"
                :current-experience="currentItem"
                :mode="addEditFormMode"
                @submit="submit"
            />
            <AdminExperienceList @open-form="openAddEditForm" />
        </Sheet>
    </div>
</template>

<script setup lang="ts">
    import type { Experience, PatchExperienceQuery, PostExperienceQuery } from '~/types/experience.types'

    function submit(data: PostExperienceQuery | PatchExperienceQuery) {
        onSubmit({ query: data })
    }

    const { openAddEditForm, isFormOpen, currentItem, addEditFormMode, onSubmit }
        = useAddEditForm<Experience, PostExperienceQuery, PatchExperienceQuery>({
            addUrl: '/api/experience',
            patchUrl: '/api/experience',
        })
</script>
