import { PatchProjectQuery } from '~/types/projects.types'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const query = getQuery(event) as PatchProjectQuery
    const { data, error } = await superbaseClient
        .from('projects')
        .update(query)
        .eq('id', query.id)

    if (error) throw createError({ statusMessage: error.message })

    return data
})
