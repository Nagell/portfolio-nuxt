import { ASSETS_BUCKET } from '~~/app/plugins/constants/assets'

import { serverSupabaseClient } from '#supabase/server'

import type { GetAssetQuery } from '~~/types/files.types'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const query = getQuery(event) as GetAssetQuery
    const { data, error } = await superbaseClient.storage
        .from(ASSETS_BUCKET)
        .download(query.name)

    if (error) throw createError({ status: 400, statusMessage: 'No such file' })

    return data
})
