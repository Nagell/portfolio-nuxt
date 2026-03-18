import { serverSupabaseUser } from '#supabase/server'

const MUTATION_METHODS = [ 'POST', 'PUT', 'PATCH', 'DELETE' ]

export default defineEventHandler(async (event) => {
    if (!MUTATION_METHODS.includes(event.method)) return

    try {
        const user = await serverSupabaseUser(event)

        if (!user || user.is_anonymous) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Authentication required'
            })
        }
    }
    catch (error) {
        if (isError(error)) throw error

        console.error('Unexpected auth middleware error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})
