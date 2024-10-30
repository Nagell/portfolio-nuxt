module.exports = {
    overrides: [
        {
            files: [ '*.ts', '*.tsx', '*.js', '*.jsx', '*.vue' ],
            extends: [
                '@nuxt/eslint-config',
            ],
            rules: {
                'no-undef': 'off',
                'import/no-unresolved': 'off',
            }
        }
    ],
    globals: {
        defineNuxtConfig: 'readonly',
        defineNuxtPlugin: 'readonly',
        useRuntimeConfig: 'readonly',
    }
}
