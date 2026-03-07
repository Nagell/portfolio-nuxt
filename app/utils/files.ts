import type { Asset } from '~~/types/files.types'

/** Downloads a file from a URL */
export function downloadBlob(blob: Blob, name: string) {
    const data = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = data
    link.download = name
    link.style.display = 'none'
    document.body.appendChild(link)

    link.click()

    setTimeout(() => {
        window.URL.revokeObjectURL(data)
        link.remove()
    }, 100)
}

/** Checks if the file is an image */
export function isImage(data: Asset) {
    return data.metadata?.mimetype?.startsWith('image')
}

/** Shows different file size descriptions on the file size (in B, KB or MB) */
export function fileSize(data: Asset) {
    const size = data.metadata?.size

    if (!size) return
    if (size < 1024) return size + ' B'
    if (size < 1024 * 1024) return (size / 1024).toFixed(0) + ' KB'
    if (size < 1024 * 1024 * 1024) return (size / 1024 / 1024).toFixed(0) + ' MB'
}
