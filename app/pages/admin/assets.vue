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
    import { useToast } from '~/components/ui/toast'

    import type { Asset } from '~~/types/files.types'

    const { toast } = useToast()

    async function submit(data: FormData) {
        try {
            await onSubmit({ body: data })
            await refreshNuxtData('assets')
            setIsFormOpen(false)
        }
        catch (error) {
            console.error('Failed to save asset:', error)
            toast({ title: 'Error', description: 'Failed to save asset. Please try again.', variant: 'destructive' })
        }
    }

    const { isFormOpen, currentItem, formMode, onSubmit, setIsFormOpen, setFormData }
        = useAddEditForm<Asset, FormData, FormData>({
            url: '/api/assets',
        })
</script>
