<template>
    <div>
        <Sheet>
            <AdminAssetsAddEditForm
                v-if="isFormOpen"
                :current-asset="currentItem"
                :mode="addEditFormMode"
                @submit="submit"
            />
            <AdminAssetsList @open-form="openAddEditForm" />
        </Sheet>
    </div>
</template>

<script setup lang="ts">
    import type { Asset } from '~/types/files.types'

    function submit(data: FormData) {
        onSubmit({ body: data })
    }

    const { openAddEditForm, isFormOpen, currentItem, addEditFormMode, onSubmit }
        = useAddEditForm<Asset, FormData, FormData>({
            addUrl: '/api/assets',
            patchUrl: '/api/assets',
        })
</script>
