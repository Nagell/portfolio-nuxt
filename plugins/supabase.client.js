import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

    if (!nuxtApp.$supabase) {
        const supabase = createClient(
            config.public.supabase.url,
            config.public.supabase.key
        )

        nuxtApp.provide('supabase', supabase)
    }
})