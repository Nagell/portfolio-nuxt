import { serverSupabaseClient } from '#supabase/server'

import type { Project } from '~~/types/projects.types'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const { data, error } = await superbaseClient
        .from('projects')
        .select('*')
        .order('id', { ascending: false })

    if (error) throw createError({ statusCode: Number(error.code) || 500, statusMessage: error.message })

    return data as Project[]
})
