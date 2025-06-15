import { sanitizeProjectsQuery } from '~/server/sanitizers/projectsQuery'

import { serverSupabaseClient } from '#supabase/server'

import type { PatchProjectQuery } from '~/types/projects.types'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const query = getQuery(event)
    const sanitizedQuery = sanitizeProjectsQuery(query) as PatchProjectQuery

    if (!sanitizedQuery.id) throw createError({ statusMessage: 'Project ID is required' })

    const { data, error } = await superbaseClient
        .from('projects')
        .update(sanitizedQuery)
        .eq('id', sanitizedQuery.id)

    if (error) throw createError({ statusMessage: error.message })

    return data
})
