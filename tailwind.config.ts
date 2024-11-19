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

            accent: {
                50: 'rgb(var(--accent-50) / <alpha-value>)',
                100: 'rgb(var(--accent-100) / <alpha-value>)',
                200: 'rgb(var(--accent-200) / <alpha-value>)',
                300: 'rgb(var(--accent-300) / <alpha-value>)',
                400: 'rgb(var(--accent-400) / <alpha-value>)',
                500: 'rgb(var(--accent-500) / <alpha-value>)',
                600: 'rgb(var(--accent-600) / <alpha-value>)',
                700: 'rgb(var(--accent-700) / <alpha-value>)',
                800: 'rgb(var(--accent-800) / <alpha-value>)',
                900: 'rgb(var(--accent-900) / <alpha-value>)',
                950: 'rgb(var(--accent-950) / <alpha-value>)',
            },

            surface: {
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
        },
        container: {
            center: true,
            padding: '2rem',
            screens: {
                lg: '1024px',
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
                sidebar: {
                    'DEFAULT': 'rgb(var(--sidebar-background) / <alpha-value>)',
                    'foreground': 'rgb(var(--sidebar-foreground) / <alpha-value>)',
                    'primary': 'rgb(var(--sidebar-primary) / <alpha-value>)',
                    'primary-foreground': 'rgb(var(--sidebar-primary-foreground) / <alpha-value>)',
                    'accent': 'rgb(var(--sidebar-accent) / <alpha-value>)',
                    'accent-foreground': 'rgb(var(--sidebar-accent-foreground) / <alpha-value>)',
                    'border': 'rgb(var(--sidebar-border) / <alpha-value>)',
                    'ring': 'rgb(var(--sidebar-ring) / <alpha-value>)',
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
