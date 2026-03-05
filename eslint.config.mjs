import withNuxt from './.nuxt/eslint.config.mjs'
import generalConfig from './config/eslint/general.mjs'
import vueConfig from './config/eslint/vue.mjs'
import htmlConfig from './config/eslint/html.mjs'

export default withNuxt(
    ...generalConfig,
    ...vueConfig,
    ...htmlConfig,
)
