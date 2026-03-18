import { ASSETS_BUCKET } from '~~/app/plugins/constants/assets'
import { assetQuerySchema } from '~~/server/schemas/assets'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)
    const query = await getValidatedQuery(event, data => assetQuerySchema.parse(data))

    const { data, error } = await superbaseClient.storage
        .from(ASSETS_BUCKET)
        .download(query.name)

    if (error) throw createError({ statusCode: 404, statusMessage: 'No such file' })

    return data
})
