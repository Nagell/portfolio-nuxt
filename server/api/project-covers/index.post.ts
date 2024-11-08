import { MultiPartData, createError } from 'h3'

import { PROJECT_COVERS_BUCKET } from '~/plugins/constants/projectCovers'

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const superbaseClient = await serverSupabaseClient(event)

    const headers = getRequestHeaders(event)

    if (!headers['content-type']?.includes('multipart/form-data'))
        throw createError({ status: 400, message: 'Bad Request' })

    const parts = await readMultipartFormData(event)

    if (!parts)
        throw createError({ status: 500, statusMessage: 'No body in the request' })

    const responses = []

    for (const part of parts) {
        const file = prepareFiles(part)
        if (file) {
            const { data, error } = await superbaseClient.storage
                .from(PROJECT_COVERS_BUCKET)
                .upload(file.name, file, {
                    cacheControl: '3600',
                    upsert: false
                })
            responses.push(data)

            if (error) throw createError(error)
        }

        return { status: 200, message: `delivered files: ${JSON.stringify(responses)}` }
    }
})

function prepareFiles(data: MultiPartData) {
    const file = data.name === 'file' ? data : null
    return file?.filename ? new File([ file.data ], file.filename, { type: file.type }) : null
}
