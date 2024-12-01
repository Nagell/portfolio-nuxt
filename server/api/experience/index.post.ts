import { PostExperienceQuery } from '~/types/experience.types'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const query = getQuery(event) as PostExperienceQuery

    if (!query.end) query.end = null
    if (!query.tags) query.tags = []

    const { data, error } = await superbaseClient
        .from('experience')
        .insert([ query ])

    if (error) throw createError({ statusMessage: error.message })

    return data
})
