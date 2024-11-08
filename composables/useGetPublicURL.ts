import type { Database } from '~/types/database.types'

export const useGetPublicURL = (name: string) => {
    const supabaseClient = useSupabaseClient<Database>()
    const { $const } = useNuxtApp()

    const dataURL = supabaseClient.storage.from($const.covers.PROJECT_COVERS_BUCKET)
        .getPublicUrl(name)

    return dataURL.data.publicUrl
}
