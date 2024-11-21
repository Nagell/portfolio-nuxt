import { PatchExperienceQuery } from '~/types/experience.types'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const query = getQuery(event) as PatchExperienceQuery
    const { data, error } = await superbaseClient
        .from('experience')
        .update(query)
        .eq('id', query.id)

    if (error) throw createError({ statusMessage: error.message })

    return data
})
