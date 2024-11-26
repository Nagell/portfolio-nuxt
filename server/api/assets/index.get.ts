import { ASSETS_BUCKET } from '~/plugins/constants/assets'

import { serverSupabaseClient } from '#supabase/server'

import type { GetFileQuery } from '~/types/files.types'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const query = getQuery(event) as GetFileQuery
    const { data, error } = await superbaseClient.storage
        .from(ASSETS_BUCKET)
        .download(query.name)

    if (error) throw createError({ statusMessage: error.message })

    return data
})
