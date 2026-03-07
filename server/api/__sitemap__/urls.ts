import { serverSupabaseClient } from '#supabase/server'

import type { SitemapUrlInput } from '#sitemap/types'
import type { Project } from '~~/types/projects.types'

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event)

    const { data, error } = await supabase
        .from('projects')
        .select('image, title')
        .order('id', { ascending: false })

    if (error || !data?.length) return []

    return [
        {
            loc: '/',
            images: (data as Pick<Project, 'image' | 'title'>[])
                .filter(p => p.image)
                .map(p => ({ loc: p.image as string, title: p.title })),
        },
    ] satisfies SitemapUrlInput[]
})
