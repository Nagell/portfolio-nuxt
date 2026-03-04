import withNuxt from './.nuxt/eslint.config.mjs'
import generalConfig from './config/eslint/general.mjs'
import vueConfig from './config/eslint/vue.mjs'
import htmlConfig from './config/eslint/html.mjs'

export default withNuxt(
    ...generalConfig,
    ...vueConfig,
    ...htmlConfig,

    // TODO: Re-enable these rules and fix violations in a follow-up PR.
    // Disabled during ESLint v9 migration to avoid scope creep — these are
    // new rules from withNuxt() that were not in the old eslintrc config.
    {
        rules: {
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-import-type-side-effects': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
        },
    },
)
