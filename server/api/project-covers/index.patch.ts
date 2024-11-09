import { createError } from 'h3'

import { PROJECT_COVERS_BUCKET } from '~/plugins/constants/projectCovers'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const parts = await readMultipartFormData(event)

    if (!parts) throw createError({ status: 500, statusMessage: 'No body in the request' })

    // prepare Files out of MultiPartData
    const files = parts
        .filter(part => part?.name === 'file')
        .map(part => part?.filename ? new File([ part.data ], part?.filename, { type: part.type }) : null)

    if (!files.length) throw createError({ status: 400, message: 'Bad Request: no files in this request' })

    const responses = []
    for (const file of files) {
        if (!file) continue

        const { data, error } = await superbaseClient.storage
            .from(PROJECT_COVERS_BUCKET)
            .upload(file.name, file, {
                cacheControl: '3600',
                upsert: true
            })

        responses.push(data)
        if (error) throw createError(error)
    }

    return { status: 200, message: `delivered files: ${JSON.stringify(responses)}` }
})
