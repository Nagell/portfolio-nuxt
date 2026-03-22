export function revalidatePage(path: string): void {
    const bypassToken = process.env.VERCEL_BYPASS_TOKEN
    // For production, use NUXT_SITE_URL (custom domain) so the correct ISR cache slot
    // is invalidated. VERCEL_URL is the deployment .vercel.app URL and has a separate
    // cache key from the custom domain — using it on production would never revalidate
    // what users actually see. Preview deployments use VERCEL_URL to revalidate their
    // own cache without touching production.
    const siteUrl
        = process.env.VERCEL_ENV === 'preview'
            ? `https://${process.env.VERCEL_URL}`
            : process.env.NUXT_SITE_URL

    if (!bypassToken || !siteUrl) return

    const headers: Record<string, string> = {
        'x-prerender-revalidate': bypassToken,
        ...(process.env.VERCEL_AUTOMATION_BYPASS_SECRET && {
            'x-vercel-protection-bypass': process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
        }),
    }

    console.log(`[revalidatePage] Triggering revalidation for: ${siteUrl}${path}`)
    fetch(`${siteUrl}${path}`, { headers })
        .then(res => console.log(`[revalidatePage] Response: ${res.status} ${res.statusText}`))
        .catch(err => console.error(`[revalidatePage] Failed to revalidate ${path}:`, err))
}
