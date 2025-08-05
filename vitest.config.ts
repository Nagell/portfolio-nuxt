// eslint-disable-next-line import/namespace
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
    test: {
        environment: 'nuxt',
        // increased timeout for e2e tests
        testTimeout: 60000,
    }
})
