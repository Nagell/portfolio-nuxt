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
    import { toast } from '~/components/ui/sonner'

    import type { Asset } from '~~/types/files.types'

    async function submit(data: FormData) {
        try {
            await onSubmit({ body: data })
            setIsFormOpen(false)
        }
        catch (error) {
            console.error('Failed to save asset:', error)
            toast.error('Failed to save asset. Please try again.')
            return
        }

        try {
            await refreshNuxtData('assets')
        }
        catch (error) {
            console.error('Failed to refresh assets list:', error)
        }
    }

    const { isFormOpen, currentItem, formMode, onSubmit, setIsFormOpen, setFormData }
        = useAddEditForm<Asset, FormData, FormData>({
            url: '/api/assets',
        })
</script>
