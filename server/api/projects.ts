import { createError } from 'h3'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    const { data, error } = await client
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
    if (error) {
        throw createError({ statusMessage: error.message })
    }

    return data
})
