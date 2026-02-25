export function revalidatePage(path: string): void {
    const bypassToken = process.env.VERCEL_BYPASS_TOKEN
    // VERCEL_URL is auto-injected per-deployment (preview + production).
    // Prefer it over NUXT_SITE_URL so preview deployments revalidate their own cache,
    // not production's. Falls back to NUXT_SITE_URL for local dev (no VERCEL_URL).
    const siteUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NUXT_SITE_URL

    if (!bypassToken || !siteUrl) return

    const headers: Record<string, string> = { 'x-prerender-revalidate': bypassToken }
    if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
        headers['x-vercel-protection-bypass'] = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
    }

    console.log(`[revalidatePage] Triggering revalidation for: ${siteUrl}${path}`)
    fetch(`${siteUrl}${path}`, { headers }).then((res) => {
        console.log(`[revalidatePage] Response: ${res.status} ${res.statusText}`)
    }).catch((err) => {
        console.error(`[revalidatePage] Failed to revalidate ${path}:`, err)
    })
}
