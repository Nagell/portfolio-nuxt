import type { SupabaseClient } from '@supabase/supabase-js'

import type { Database } from '~~/types/database.types'

export async function bustProjectImageCache(
    client: SupabaseClient<Database>,
    publicUrl: string
): Promise<void> {
    const baseUrl = publicUrl.split('?')[0]

    const { data: projects } = await client
        .from('projects')
        .select('id')
        .like('image', `${baseUrl}%`)

    if (!projects?.length) return

    await client
        .from('projects')
        .update({ image: `${baseUrl}?v=${Date.now()}` })
        .in('id', projects.map(p => p.id))

    revalidatePage('/')
}
