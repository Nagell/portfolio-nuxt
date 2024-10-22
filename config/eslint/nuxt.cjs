module.exports = {
    overrides: [
        {
            files: [ '*.ts', '*.tsx', '*.js', '*.jsx', '*.vue' ],
            extends: [
                '@nuxt/eslint-config',
            ],
            rules: {
                'no-undef': [
                    'warn',
                ],
            }
        }
    ],
    globals: {
        defineNuxtConfig: 'readonly',
        defineNuxtPlugin: 'readonly',
        useRuntimeConfig: 'readonly',
    }
}
