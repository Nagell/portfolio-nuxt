import { defineVitestConfig } from '@nuxt/test-utils/config'

import type { Plugin } from 'vite'

// Vite 7 throws when noExternal:true (set by nuxt test env) encounters a
// Bun built-in that cannot be bundled. Resolve it as external before
// import-analysis runs so the environment flag doesn't win.
const externalizeBunModules: Plugin = {
    name: 'externalize-bun-modules',
    enforce: 'pre',
    resolveId(id) {
        if (id.startsWith('bun:')) {
            return { id, external: true }
        }
    },
}

export default defineVitestConfig({
    test: {
        environment: 'nuxt',
        testTimeout: 60000,
        setupFiles: [ './vitest.setup.ts' ],
    },
    plugins: [ externalizeBunModules ],
})
