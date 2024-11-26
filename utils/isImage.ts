import type { Asset } from '~/types/files.types'

export default (data: Asset) => {
    return data.metadata?.mimetype?.startsWith('image')
}
