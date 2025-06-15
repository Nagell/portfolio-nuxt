import { serverSupabaseClient } from '#supabase/server'

import type { DeleteProjectQuery } from '~/types/projects.types'

export default eventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const query = getQuery(event) as DeleteProjectQuery
    const { data, error } = await superbaseClient
        .from('experience')
        .delete()
        .match({ id: query.id })

    if (error) throw createError({ statusMessage: error.message })

    return data
})
