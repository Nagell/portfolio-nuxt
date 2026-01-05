// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    ignoreOptions: {
        allowRelativePaths: true,
    },

    routeRules: {
        // Prerendered pages - reliable, no -isr bug, served as static files
        '/': { prerender: true },
        '/legal-notice': { prerender: true },
        '/privacy-policy': { prerender: true },
        '/admin/**': { robots: false },
        '/admin': { redirect: '/admin/projects' },
    },
    modules: [
        '@nuxt/fonts',
        '@nuxt/image',
        '@nuxt/test-utils/module',
        '@nuxtjs/color-mode',
        '@nuxtjs/robots',
        '@nuxtjs/sitemap',
        '@nuxtjs/supabase',
        '@nuxtjs/tailwindcss',
        'nuxt-lucide-icons',
        'shadcn-nuxt',
    ],
    supabase: {
        redirectOptions: {
            login: '/login',
            callback: '/admin/projects',
            include: [ '/admin(/*)?' ],
        },
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
        exclude: [
            '/__tests__/**',
            '/admin/**',
            '/login',
        ],
    },
    shadcn: {
        prefix: '',
        componentDir: './components/ui'
    },
    tailwindcss: {
        cssPath: '~/assets/styles/main.css',
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
    image: {
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
