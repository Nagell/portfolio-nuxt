import { createError } from 'h3'

import { serverSupabaseClient } from '#supabase/server'

import type { GetFileQuery } from '~/types/files.types'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const query = getQuery(event) as GetFileQuery
    const { data, error } = await superbaseClient.storage
        .from('project-covers')
        .download(query.path)

    if (error) throw createError({ statusMessage: error.message })

    return data
})
