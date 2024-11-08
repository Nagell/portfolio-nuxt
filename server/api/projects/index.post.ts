import { createError } from 'h3'

import { Tables } from '~/types/database.types'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const query = getQuery(event) as Tables<'projects'>
    const { data, error } = await superbaseClient
        .from('projects')
        .insert([ query ])

    if (error) throw createError({ statusMessage: error.message })

    return data
})
