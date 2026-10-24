import withNuxt from './.nuxt/eslint.config.mjs'
import generalConfig from './config/eslint/general.mjs'
import vueConfig from './config/eslint/vue.mjs'
import htmlConfig from './config/eslint/html.mjs'

export default withNuxt(
    // React mirror for the Claude Design system and its /design-sync inputs and scratch (see tools/design-system/README.md)
    { ignores: ['tools/design-system/**', '.design-sync/**', '.ds-sync/**', 'ds-bundle/**'] },
    ...generalConfig,
    ...vueConfig,
    ...htmlConfig,
)
