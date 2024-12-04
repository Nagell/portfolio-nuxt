import { sanitizeProjectsQuery } from '~/server/sanitizers/projectsQuery'
import { PostProjectQuery } from '~/types/projects.types'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const query = getQuery(event)
    const sanitizedQuery = sanitizeProjectsQuery(query) as PostProjectQuery

    const { data, error } = await superbaseClient
        .from('projects')
        .insert([ sanitizedQuery ])

    if (error) throw createError({ statusMessage: error.message })

    return data
})
