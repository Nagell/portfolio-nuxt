import type { TestOptions } from 'vitest'

const SEE_BROWSER = false

const browserOptions = SEE_BROWSER
    ? {
        browser: true,
        browserOptions: {
            type: 'chromium',
            launch: {
                headless: false,
                slowMo: 5000,
                timeout: 10000,
            }
        },
    } as Partial<TestOptions>
    : {}

export const setupOptions = {
    ...browserOptions,
    host: import.meta.env.VITE_ORIGIN,
}
