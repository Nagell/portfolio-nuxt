module.exports = {
    root: true,
    extends: [
        '',
        './config/eslint/general.cjs',
        './config/eslint/vue.cjs',
        './config/eslint/nuxt.cjs',
        './config/eslint/html.cjs',
    ],
    ignorePatterns: [
        // '!**/*'
    ],
    env: {
        browser: true,
        node: true,
        es2022: true
    },
    settings: {
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            },
        },
    },
}
