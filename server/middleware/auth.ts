import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const FORBIDDEN_METHODS = [ 'POST', 'PUT', 'PATCH', 'DELETE' ]

    if (FORBIDDEN_METHODS.includes(event.method)) {
        try {
            const user = await serverSupabaseUser(event)

            // Check if user exists and is properly authenticated
            if (!user || !user.id) {
                throw createError({
                    status: 401,
                    statusMessage: 'Authentication required'
                })
            }

            // Verify user session is valid (Supabase users have role 'authenticated' when logged in)
            if (user.role !== 'authenticated') {
                throw createError({
                    status: 401,
                    statusMessage: 'Invalid authentication state'
                })
            }
        }
        catch (error: any) {
            // Handle potential Supabase errors gracefully
            if (error?.statusCode) {
                throw error // Re-throw our own createError instances
            }

            throw createError({
                status: 401,
                statusMessage: 'Authentication failed'
            })
        }
    }
})
