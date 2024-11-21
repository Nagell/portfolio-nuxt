import { PostExperienceQuery } from '~/types/experience.types'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const query = getQuery(event) as PostExperienceQuery
    const { data, error } = await superbaseClient
        .from('experience')
        .insert([ query ])

    if (error) throw createError({ statusMessage: error.message })

    return data
})
