import { ASSETS_BUCKET } from '~/plugins/constants/assets'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const parts = await readMultipartFormData(event)

    if (!parts) throw createError({ status: 400, statusMessage: 'No body in the request' })

    // prepare Files out of MultiPartData
    const files = parts
        .filter(part => part?.name === 'file')
        .map(part => part?.filename
            ? new File([ new Uint8Array(part.data) ], part?.filename, { type: part.type })
            : null)

    if (!files.length) throw createError({ status: 400, statusMessage: 'Bad Request: no files in this request' })

    const responses = []
    for (const file of files) {
        if (!file) continue

        const { data, error } = await superbaseClient.storage
            .from(ASSETS_BUCKET)
            .upload(file.name, file, {
                cacheControl: '3600',
                upsert: false
            })
        if (error) throw createError({ statusMessage: error.message })

        responses.push(data)
    }

    return { status: 200, message: `delivered files: ${JSON.stringify(responses)}` }
})
