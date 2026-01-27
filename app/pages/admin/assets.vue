<template>
    <div>
        <Sheet @update:open="setIsFormOpen">
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

    function submit(data: FormData) {
        onSubmit({ body: data })
    }

    const { isFormOpen, currentItem, formMode, onSubmit, setIsFormOpen, setFormData }
        = useAddEditForm<Asset, FormData, FormData>({
            url: '/api/assets',
        })
</script>
