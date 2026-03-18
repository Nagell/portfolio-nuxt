import { projectsUpdateSchema } from '~~/server/schemas/projects'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)
    const query = await getValidatedQuery(event, data => projectsUpdateSchema.parse(data))

    const { data, error } = await superbaseClient
        .from('projects')
        .update(query)
        .eq('id', query.id)

    if (error) throw createError({ statusCode: Number(error.code) || 500, statusMessage: error.message })

    revalidatePage('/')
    return data
})
