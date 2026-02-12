<template>
    <div>
        <Sheet
            :open="isFormOpen"
            @update:open="setIsFormOpen"
        >
            <AdminAssetsAddEditForm
                v-if="isFormOpen"
                :current-asset="currentItem"
                :mode="formMode"
                @submit="submit"
            />
            <AdminAssetsList @set-form-data="setFormData" />
        </Sheet>
    </div>
</template>

<script setup lang="ts">
    import type { Asset } from '~~/types/files.types'

    async function submit(data: FormData) {
        try {
            await onSubmit({ body: data })
            await refreshNuxtData('assets')
        }
        finally {
            setIsFormOpen(false)
        }
    }

    const { isFormOpen, currentItem, formMode, onSubmit, setIsFormOpen, setFormData }
        = useAddEditForm<Asset, FormData, FormData>({
            url: '/api/assets',
        })
</script>
