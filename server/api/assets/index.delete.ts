import { ASSETS_BUCKET } from '~~/app/plugins/constants/assets'

import { serverSupabaseClient } from '#supabase/server'

import type { DeleteAssetQuery } from '~~/types/files.types'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const query = getQuery(event) as DeleteAssetQuery
    const { data, error } = await superbaseClient.storage
        .from(ASSETS_BUCKET)
        .remove([ query.name ])

    if (error) throw createError({ statusMessage: error.message })

    return data
})
