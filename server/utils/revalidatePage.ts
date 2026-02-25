export function revalidatePage(path: string): void {
    const bypassToken = process.env.VERCEL_BYPASS_TOKEN
    const siteUrl = process.env.NUXT_SITE_URL

    if (!bypassToken || !siteUrl) return

    console.log(`[revalidatePage] Triggering revalidation for: ${path}`)
    fetch(`${siteUrl}${path}`, {
        headers: { 'x-prerender-revalidate': bypassToken },
    }).catch((err) => {
        console.error(`[revalidatePage] Failed to revalidate ${path}:`, err)
    })
}
