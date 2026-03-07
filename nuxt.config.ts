import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    ignore: [ '**/__tests__/**' ],
    ignoreOptions: {
        allowRelativePaths: true,
    },

    routeRules: {
        // ISR - cached indefinitely on Vercel CDN, invalidated on-demand via revalidatePage()
        '/': { isr: true },
        '/legal-notice': { prerender: true },
        '/privacy-policy': { prerender: true },
        '/admin/**': { robots: false },
        '/admin': { redirect: '/admin/projects' },
    },
    modules: [
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@nuxt/image',
        '@nuxt/test-utils/module',
        '@nuxtjs/color-mode',
        '@nuxtjs/robots',
        '@nuxtjs/sitemap',
        '@nuxtjs/supabase',
        'shadcn-nuxt',
    ],
    css: [ '~/assets/styles/main.css' ],
    vite: {
        // @ts-expect-error vite type mismatch between @tailwindcss/vite and @nuxt/schema (nuxt#34384)
        plugins: [ tailwindcss() ],
    },
    shadcn: {
        prefix: '',
        componentDir: './app/components/ui',
    },
    supabase: {
        redirectOptions: {
            login: '/login',
            callback: '/admin/projects',
            include: [ '/admin(/*)?' ],
        },
        types: '~~/types/database.types.ts',
    },
    runtimeConfig: {
        public: {
            supabase: {
                url: process.env.SUPABASE_URL,
                key: process.env.SUPABASE_KEY,
            }
        }
    },
    sitemap: {
        exclude: [ '/__tests__/**', '/admin/**', '/login' ]
    },
    components: {
        dirs: [
            // Non-ui components with normal path prefix (shadcn-nuxt handles ~/components/ui)
            {
                path: '~/components',
                ignore: [ 'ui/**', '**/*.ts' ],
            },
        ],
    },
    colorMode: {
        preference: 'dark',
        fallback: 'dark',
        hid: 'nuxt-color-mode-script',
        globalName: '__NUXT_COLOR_MODE__',
        componentName: 'ColorScheme',
        classPrefix: '',
        classSuffix: '',
        storage: 'localStorage',
        storageKey: 'nuxt-color-mode'
    },
    nitro: {
        vercel: {
            config: {
                bypassToken: process.env.VERCEL_BYPASS_TOKEN,
            },
        },
    },
    image: {
        provider: 'ipx',
        ipx: {
            maxAge: 31536000, // 1 year — Vercel CDN; naturally busted when image URL changes
        },
        format: [ 'webp', 'jpeg' ],
        domains: [
            '127.0.0.1:54321', // Local Supabase
            process.env.SUPABASE_URL?.replace('https://', '') || '', // Production Supabase
        ],
        alias: {
            supabase: process.env.SUPABASE_URL + '/storage/v1/object/public',
        },
    },
})
