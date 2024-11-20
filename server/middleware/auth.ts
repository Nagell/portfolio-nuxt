import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const FORBIDDEN_METHODS = [ 'POST', 'PUT', 'PATCH', 'DELETE' ]

    if (FORBIDDEN_METHODS.includes(event.method)) {
        const user = await serverSupabaseUser(event)

        if (!user || user?.role !== 'authenticated')
            throw createError({ status: 401, statusMessage: 'Unauthorized' })
    }
})
