import { sanitizeProjectsQuery } from '~~/server/sanitizers/projectsQuery'

import { serverSupabaseClient } from '#supabase/server'

import type { PostProjectQuery } from '~~/types/projects.types'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const query = getQuery(event)
    const sanitizedQuery = sanitizeProjectsQuery(query) as PostProjectQuery

    const { data, error } = await superbaseClient
        .from('projects')
        .insert([ sanitizedQuery ])

    if (error) throw createError({ statusCode: Number(error.code) || 500, statusMessage: error.message })

    return data
})
