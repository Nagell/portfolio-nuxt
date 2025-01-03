// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },

    routeRules: {
        // Home generated on demand, revalidates in background, cached for 1 hour (3600 seconds)
        '/': { isr: 3600 },
        '/legal-notice': { isr: 3600 },
        '/privacy-policy': { isr: 3600 },
        '/admin/**': { robots: false },
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/supabase',
        'shadcn-nuxt',
        '@nuxtjs/color-mode',
        'nuxt-lucide-icons',
        '@nuxt/image',
        '@nuxt/fonts',
        '@nuxtjs/sitemap',
        '@nuxtjs/robots',
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
    shadcn: {
        prefix: '',
        componentDir: './components/ui'
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
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
    },
})
