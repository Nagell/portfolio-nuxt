import containerQueries from '@tailwindcss/container-queries'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

import type { Config } from 'tailwindcss'

export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
    ],
    theme: {
        // Define your overwrites and customizations for the default Tailwind CSS theme here
        colors: {
            transparent: 'transparent',
            current: 'currentColor',

            primary: {
                DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
                50: 'rgb(var(--primary-50) / <alpha-value>)',
                100: 'rgb(var(--primary-100) / <alpha-value>)',
                200: 'rgb(var(--primary-200) / <alpha-value>)',
                300: 'rgb(var(--primary-300) / <alpha-value>)',
                400: 'rgb(var(--primary-400) / <alpha-value>)',
                500: 'rgb(var(--primary-500) / <alpha-value>)',
                600: 'rgb(var(--primary-600) / <alpha-value>)',
                700: 'rgb(var(--primary-700) / <alpha-value>)',
                800: 'rgb(var(--primary-800) / <alpha-value>)',
                900: 'rgb(var(--primary-900) / <alpha-value>)',
                950: 'rgb(var(--primary-950) / <alpha-value>)',
            },

            surface: {
                DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
                50: 'rgb(var(--surface-50) / <alpha-value>)',
                100: 'rgb(var(--surface-100) / <alpha-value>)',
                200: 'rgb(var(--surface-200) / <alpha-value>)',
                300: 'rgb(var(--surface-300) / <alpha-value>)',
                400: 'rgb(var(--surface-400) / <alpha-value>)',
                500: 'rgb(var(--surface-500) / <alpha-value>)',
                600: 'rgb(var(--surface-600) / <alpha-value>)',
                700: 'rgb(var(--surface-700) / <alpha-value>)',
                800: 'rgb(var(--surface-800) / <alpha-value>)',
                900: 'rgb(var(--surface-900) / <alpha-value>)',
                950: 'rgb(var(--surface-950) / <alpha-value>)',
            },

            white: 'rgb(var(--white) / <alpha-value>)',
        },
        extend: {
            // Add your custom classes, or override existing classes here
            borderRadius: {
                DEFAULT: 'var(--border-radius)',
            },
        },
    },
    plugins: [
        containerQueries,
        forms,
        typography,
    ],
} satisfies Config
