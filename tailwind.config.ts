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
        fontFamily: {
            sans: [ 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' ],
        },
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1.5rem',
                lg: '1rem',
            },
            screens: {
                lg: '1024px',
            },
        },
        extend: {
            // Add your custom classes, or override existing classes here
            screens: {
                xs: '450px',
            },
            colors: {
                border: 'hsl(var(--border) / <alpha-value>)',
                input: 'hsl(var(--input) / <alpha-value>)',
                ring: 'hsl(var(--ring) / <alpha-value>)',
                background: 'hsl(var(--background) / <alpha-value>)',
                foreground: 'hsl(var(--foreground) / <alpha-value>)',
                primary: {
                    DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
                    foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
                    foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
                    foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
                    foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
                    foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
                    foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
                },
                card: {
                    DEFAULT: 'hsl(var(--card) / <alpha-value>)',
                    foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
                },
                sidebar: {
                    'DEFAULT': 'hsl(var(--sidebar-background) / <alpha-value>)',
                    'foreground': 'hsl(var(--sidebar-foreground) / <alpha-value>)',
                    'primary': 'hsl(var(--sidebar-primary) / <alpha-value>)',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground) / <alpha-value>)',
                    'accent': 'hsl(var(--sidebar-accent) / <alpha-value>)',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground) / <alpha-value>)',
                    'border': 'hsl(var(--sidebar-border) / <alpha-value>)',
                    'ring': 'hsl(var(--sidebar-ring) / <alpha-value>)',
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
                'hero-text-blur': {
                    '0%': { filter: 'blur(10px)', transform: 'translateY(10px)', opacity: '0' },
                    '100%': { filter: 'blur(0px)', transform: 'translateY(0px)', opacity: '1' }
                },
                'text-blur': {
                    '0%': { filter: 'blur(10px)', transform: 'translateY(50px)', opacity: '0' },
                    '100%': { filter: 'blur(0px)', transform: 'translateY(0px)', opacity: '1' }
                },
                'image-hero-blur': {
                    '0%': { transform: 'translateZ(200px) translateX(50px)', opacity: '0', filter: 'blur(10px)' },
                    '100%': { transform: 'translateZ(0px) translateX(0px)', opacity: '1', filter: 'blur(0px)' }
                },
                'project-card-slide': {
                    '0%': { opacity: '0', transform: 'translateX(300px) scale(0.3)', filter: 'blur(10px)' },
                    '100%': { opacity: '1', transform: 'translateX(0) scale(1)', filter: 'blur(0px)' }
                },
            },
            transitionTimingFunction: {
                'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
                'out-expo': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'collapsible-down': 'collapsible-down 0.2s ease-in-out',
                'collapsible-up': 'collapsible-up 0.2s ease-in-out',
                'hero-text-blur': 'hero-text-blur 1s out-expo',
                'text-blur': 'hero-text-blur 1s out-expo',
                'image-hero-blur': 'image-hero-blur 1s out-expo',
                'project-card-slide': 'project-card-slide 0.8s out-expo',
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
