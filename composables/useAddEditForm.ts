import type { NitroFetchRequest } from 'nitropack/types'
import type { Props as FormProps } from '~/components/common/AddEditFormWrapper.vue'

type Options = {
    url: NitroFetchRequest
}

export const useAddEditForm = <T, AddQuery, PatchQuery>(options: Options) => {
    const isFormOpen = ref(false)
    const addEditFormMode = ref<FormProps['mode']>('add')
    const currentItem = ref<T | {}>({})

    type FormModeQueryType = typeof addEditFormMode extends { value: 'add' }
        ? AddQuery
        : PatchQuery

    type SubmitData = {
        query?: FormModeQueryType
        body?: any
    }

    async function onSubmit(data: SubmitData) {
        addEditFormMode.value === 'add'
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

    function openAddEditForm(event: { mode: FormProps['mode'], item?: T }) {
        isFormOpen.value = true
        addEditFormMode.value = event.mode
        currentItem.value = event.item ?? {}
    }

    return {
        isFormOpen,
        addEditFormMode,
        currentItem,
        onSubmit,
        openAddEditForm,
    }
}
