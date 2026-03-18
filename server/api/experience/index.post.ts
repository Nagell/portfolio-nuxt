import { experienceInsertSchema } from '~~/server/schemas/experience'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)
    const query = await getValidatedQuery(event, data => experienceInsertSchema.parse(data))

    const { data, error } = await superbaseClient
        .from('experience')
        .insert([ query ])

    if (error) throw createError({ statusCode: Number(error.code) || 500, statusMessage: error.message })

    revalidatePage('/')
    return data
})
