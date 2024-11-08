import { createError } from 'h3'

import { PROJECT_COVERS_BUCKET } from '~/plugins/constants/projectCovers'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const { data, error } = await superbaseClient.storage
        .from(PROJECT_COVERS_BUCKET)
        .list()

    if (error) throw createError({ statusMessage: error.message })

    return data
})
