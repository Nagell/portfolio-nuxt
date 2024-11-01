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
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
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
