import { createError } from 'h3'

import { PROJECT_COVERS_BUCKET } from '~/plugins/constants/projectCovers'

import { serverSupabaseClient } from '#supabase/server'

import type { UploadFileQuery } from '~/types/files.types'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const query = getQuery(event) as UploadFileQuery
    const { data, error } = await superbaseClient.storage
        .from(PROJECT_COVERS_BUCKET)
        .upload(query.name, query.file, {
            cacheControl: '3600',
            upsert: false
        })

    if (error) throw createError({ statusMessage: error.message })

    return data
})