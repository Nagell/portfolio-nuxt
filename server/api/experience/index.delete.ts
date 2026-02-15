import { serverSupabaseClient } from '#supabase/server'

import type { DeleteExperienceQuery } from '~~/types/experience.types'

export default eventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const query = getQuery(event) as DeleteExperienceQuery

    if (!query.id) throw createError({ statusCode: 400, statusMessage: 'ID is required' })

    const { data, error } = await superbaseClient
        .from('experience')
        .delete()
        .match({ id: query.id })

    if (error) throw createError({ statusCode: Number(error.code) || 500, statusMessage: error.message })

    return data
})
