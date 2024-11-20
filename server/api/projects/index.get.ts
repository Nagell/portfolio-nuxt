import { Project } from '~/types/projects.types'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const { data, error } = await superbaseClient
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) throw createError({ statusMessage: error.message })

    return data as Project[]
})
