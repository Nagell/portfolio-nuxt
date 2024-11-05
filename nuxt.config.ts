// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/supabase',
        'shadcn-nuxt',
        '@nuxtjs/color-mode',
        'nuxt-lucide-icons'
    ],
    supabase: {
        redirectOptions: {
            login: '/login',
            callback: '/admin',
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
    css: [ '~/assets/styles/main.css' ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
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
    }
})
