import { createError } from 'h3'

import { serverSupabaseClient } from '#supabase/server'

import type { DeleteFileQuery } from '~/types/files.types'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const query = getQuery(event) as DeleteFileQuery
    const { data, error } = await superbaseClient.storage
        .from('project-covers')
        .remove([ query.path ])

    if (error) throw createError({ statusMessage: error.message })

    return data
})
