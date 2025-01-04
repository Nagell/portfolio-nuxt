import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
    test: {
        // increased timeout for e2e tests
        testTimeout: 60000,
    }
})
