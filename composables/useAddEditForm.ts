import type { NitroFetchRequest } from 'nitropack/types'
import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'

type Options = {
    url: NitroFetchRequest
}

export const useAddEditForm = <T, AddQuery, PatchQuery>(options: Options) => {
    const isFormOpen = ref(false)
    const formMode = ref<FormProps['mode']>('add')
    const currentItem = ref<T | {}>({})

    type FormModeQueryType = typeof formMode extends { value: 'add' }
        ? AddQuery
        : PatchQuery

    type SubmitData = {
        query?: FormModeQueryType
        body?: any
    }

    async function onSubmit(data: SubmitData) {
        formMode.value === 'add'
            ? await _add(data)
            : await _patch(data)
    }

    async function _add(data: SubmitData) {
        await $fetch(options.url, {
            headers: useRequestHeaders([ 'cookie' ]),
            query: data.query ?? {},
            body: data.body,
            method: 'post'
        })
    }

    async function _patch(data: SubmitData) {
        await $fetch(options.url, {
            headers: useRequestHeaders([ 'cookie' ]),
            query: data.query ?? {},
            body: data.body,
            method: 'patch'
        })
    }

    function setFormData(event: { mode: FormProps['mode'], item?: T }) {
        formMode.value = event.mode
        currentItem.value = event.item ?? {}
    }

    function _cleanFormData() {
        formMode.value = 'add'
        currentItem.value = {}
    }

    function setIsFormOpen(isOpen: boolean) {
        if (isOpen === true) {
            isFormOpen.value = true
        }
        else {
            // If closing wait some time before destroying components
            // This way we make sure that we don't wipe form data before submitting
            setTimeout(() => {
                isFormOpen.value = false
                _cleanFormData()
            }, 100)
        }
    }

    return {
        isFormOpen,
        formMode,
        currentItem,
        onSubmit,
        setFormData,
        setIsFormOpen,
    }
}
