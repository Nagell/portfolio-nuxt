import type { TestOptions } from 'vitest'

const IS_BROWSER_VISIBLE = false

const browserOptions = IS_BROWSER_VISIBLE
    ? {
        browser: true,
        browserOptions: {
            type: 'chromium',
            launch: {
                headless: false,
                slowMo: 1000,
                timeout: 20000,
            }
        },
    } as Partial<TestOptions>
    : {}

export const setupOptions = {
    ...browserOptions,
    host: import.meta.env.VITE_ORIGIN,
}
