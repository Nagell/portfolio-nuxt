import { Experience } from '~/types/experience.types'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const { data, error } = await superbaseClient
        .from('experience')
        .select('*')
        .order('id', { ascending: false })

    if (error) throw createError({ statusMessage: error.message })

    return data as Experience[]
})
