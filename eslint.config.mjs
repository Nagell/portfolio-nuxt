import withNuxt from './.nuxt/eslint.config.mjs'
import generalConfig from './config/eslint/general.mjs'
import vueConfig from './config/eslint/vue.mjs'
import htmlConfig from './config/eslint/html.mjs'

export default withNuxt(
    // React mirror for the Claude Design system, built separately (see its README)
    { ignores: ['tools/design-system/**'] },
    ...generalConfig,
    ...vueConfig,
    ...htmlConfig,
)
