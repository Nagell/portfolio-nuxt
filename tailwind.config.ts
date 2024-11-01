import containerQueries from '@tailwindcss/container-queries'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'

import type { Config } from 'tailwindcss'

export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
    ],
    darkMode: [ 'class' ],
    safelist: [ 'dark', 'light' ],
    prefix: '',
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
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            // Add your custom classes, or override existing classes here
            colors: {
                border: 'rgb(var(--border) / <alpha-value>)',
                input: 'rgb(var(--input) / <alpha-value>)',
                ring: 'rgb(var(--ring) / <alpha-value>)',
                background: 'rgb(var(--background) / <alpha-value>)',
                foreground: 'rgb(var(--foreground) / <alpha-value>)',
                primary: {
                    DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
                    foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
                },
                secondary: {
                    DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
                    foreground: 'rgb(var(--secondary-foreground) / <alpha-value>)',
                },
                destructive: {
                    DEFAULT: 'rgb(var(--destructive) / <alpha-value>)',
                    foreground: 'rgb(var(--destructive-foreground) / <alpha-value>)',
                },
                muted: {
                    DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
                    foreground: 'rgb(var(--muted-foreground) / <alpha-value>)',
                },
                accent: {
                    DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
                    foreground: 'rgb(var(--accent-foreground) / <alpha-value>)',
                },
                popover: {
                    DEFAULT: 'rgb(var(--popover) / <alpha-value>)',
                    foreground: 'rgb(var(--popover-foreground) / <alpha-value>)',
                },
                card: {
                    DEFAULT: 'rgb(var(--card) / <alpha-value>)',
                    foreground: 'rgb(var(--card-foreground) / <alpha-value>)',
                },
            },
            borderRadius: {
                xl: 'calc(var(--radius) + 4px)',
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                'collapsible-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-collapsible-content-height)' },
                },
                'collapsible-up': {
                    from: { height: 'var(--radix-collapsible-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'collapsible-down': 'collapsible-down 0.2s ease-in-out',
                'collapsible-up': 'collapsible-up 0.2s ease-in-out',
            },
        },
    },
    plugins: [
        containerQueries,
        forms,
        typography,
        animate
    ],
} satisfies Config
