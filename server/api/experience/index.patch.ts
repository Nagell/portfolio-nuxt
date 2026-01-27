import { sanitizeExperienceQuery } from '~~/server/sanitizers/experienceQuery'

import { serverSupabaseClient } from '#supabase/server'

import type { PatchExperienceQuery } from '~~/types/experience.types'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const query = getQuery(event)
    const sanitizedQuery = sanitizeExperienceQuery(query) as PatchExperienceQuery

    if (!sanitizedQuery.id) throw createError({ statusMessage: 'Experience ID is required' })

    const { data, error } = await superbaseClient
        .from('experience')
        .update(sanitizedQuery)
        .eq('id', sanitizedQuery.id)

    if (error) throw createError({ statusMessage: error.message })

    return data
})
