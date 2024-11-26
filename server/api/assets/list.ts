import { ASSETS_BUCKET } from '~/plugins/constants/assets'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const { data, error } = await superbaseClient.storage
        .from(ASSETS_BUCKET)
        .list()

    if (error) throw createError({ statusMessage: error.message })

    return data
})
