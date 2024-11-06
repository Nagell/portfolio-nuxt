export default defineNuxtRouteMiddleware((to, from) => {
    // Check if user is authenticated
    const supabaseUser = useSupabaseUser()

    if (!supabaseUser.value) {
        return navigateTo('/login')
    }
})
