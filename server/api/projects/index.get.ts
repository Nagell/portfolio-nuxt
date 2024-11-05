import { createError } from 'h3'

import { serverSupabaseClient } from '#supabase/server'

import type { Tables } from '~/types/database.types'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const { data, error } = await superbaseClient
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) throw createError({ statusMessage: error.message })

    return data as Tables<'projects'>[]
})
