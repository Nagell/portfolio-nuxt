import type { Asset } from '~/types/files.types'

export function downloadBlob(blob: Blob, name: string) {
    const data = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = data
    link.download = name

    // this is necessary as link.click() does not work on the Firefox
    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        })
    )

    setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data)
        link.remove()
    }, 100)
}

export function isImage(data: Asset) {
    return data.metadata?.mimetype?.startsWith('image')
}
