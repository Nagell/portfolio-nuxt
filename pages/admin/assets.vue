<template>
    <div>
        <Sheet>
            <AdminAssetsAddEditForm
                v-if="isFormOpen"
                :current-asset="currentAsset"
                :mode="addEditFormMode"
            />
            <AdminAssetsList @open-form="openAddEditForm" />
        </Sheet>
    </div>
</template>

<script setup lang="ts">
    import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'
    import type { Asset } from '~/types/files.types'

    const isFormOpen = ref(false)
    const addEditFormMode = ref<FormProps['mode']>('add')
    const currentAsset = ref<Asset>()

    function openAddEditForm(event: { mode: FormProps['mode'], asset?: Asset }) {
        isFormOpen.value = true
        addEditFormMode.value = event.mode
        currentAsset.value = event.asset ?? undefined
    }
</script>
