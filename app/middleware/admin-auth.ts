export default defineNuxtRouteMiddleware(async () => {
    // Workaround for @nuxtjs/supabase v2 issue #565:
    // useSupabaseUser() returns null on page refresh in middlewares because
    // it initializes in page:start hook (which runs after middlewares).
    // Use getClaims() directly instead.
    const supabase = useSupabaseClient()
    const { data, error } = await supabase.auth.getClaims()

    if (error) {
        console.error('Auth claims check failed:', error.message)
        throw createError({ statusCode: 500, statusMessage: 'Authentication service unavailable' })
    }

    if (!data?.claims) return navigateTo('/login')
})
