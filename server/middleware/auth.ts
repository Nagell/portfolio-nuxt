import { H3Error } from 'h3'

import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const FORBIDDEN_METHODS = [ 'POST', 'PUT', 'PATCH', 'DELETE' ]

    if (FORBIDDEN_METHODS.includes(event.method)) {
        try {
            const user = await serverSupabaseUser(event)

            if (!user || !user.sub) {
                throw createError({
                    statusCode: 401,
                    statusMessage: 'Authentication required'
                })
            }

            if (user.role !== 'authenticated') {
                throw createError({
                    statusCode: 401,
                    statusMessage: 'Invalid authentication state'
                })
            }
        }
        catch (error) {
            if (error instanceof H3Error) throw error

            console.error('Unexpected auth middleware error:', error)
            throw createError({
                statusCode: 500,
                statusMessage: 'Internal server error'
            })
        }
    }
})
