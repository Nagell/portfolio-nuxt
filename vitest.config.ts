import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
    test: {
        // if other tests will be added, this should be changed or deleted
        environment: 'nuxt',
    }
})
