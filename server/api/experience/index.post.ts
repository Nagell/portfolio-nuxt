import { sanitizeExperienceQuery } from '~/server/sanitizers/experienceQuery'

import { serverSupabaseClient } from '#supabase/server'

import type { PostExperienceQuery } from '~/types/experience.types'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const query = getQuery(event)
    const sanitizedQuery = sanitizeExperienceQuery(query) as PostExperienceQuery

    const { data, error } = await superbaseClient
        .from('experience')
        .insert([ sanitizedQuery ])

    if (error) throw createError({ statusMessage: error.message })

    return data
})
