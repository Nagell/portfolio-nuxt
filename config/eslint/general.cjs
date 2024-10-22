module.exports = {
    plugins: [
        '@stylistic'
    ],
    overrides: [
        {
            files: [ '*.ts', '*.tsx', '*.js', '*.cjs', '*.jsx', '*.vue' ],
            extends: [
                'eslint:recommended',
                // docs: https://eslint.style/rules
                'plugin:@stylistic/recommended-extends',
                // docs: https://github.com/import-js/eslint-plugin-import
                'plugin:import/recommended',
                'plugin:import/typescript',
            ],
            rules: {
                '@stylistic/indent': [
                    'warn',
                    4
                ],
                '@stylistic/comma-dangle': [
                    'warn',
                    'only-multiline'
                ],
                '@stylistic/array-bracket-spacing': [
                    'warn',
                    'always'
                ],
                '@stylistic/max-len': [
                    'warn',
                    {
                        code: 120,
                        tabWidth: 4,
                        comments: 120,
                        ignorePattern: '',
                        ignoreComments: false,
                        ignoreTrailingComments: false,
                        ignoreUrls: true,
                        ignoreStrings: true,
                        ignoreTemplateLiterals: true,
                        ignoreRegExpLiterals: true
                    }
                ],
                '@stylistic/indent-binary-ops': [
                    'warn',
                    4
                ],
                'sort-imports': [
                    'error',
                    {
                        ignoreCase: false,
                        ignoreDeclarationSort: true,
                        ignoreMemberSort: false,
                        memberSyntaxSortOrder: [ 'none', 'all', 'multiple', 'single' ],
                        allowSeparatedGroups: true,
                    },
                ],
                'import/no-unresolved': 'error',
                'import/order': [
                    'error',
                    {
                        'groups': [
                            'builtin',
                            'external',
                            'internal',
                            [ 'sibling', 'parent' ],
                            'index',
                            'unknown',
                            'type'
                        ],
                        'pathGroupsExcludedImportTypes': [ 'builtin', 'object' ],
                        'newlines-between': 'always',
                        'alphabetize': {
                            order: 'asc',
                            caseInsensitive: true,
                        },
                    },
                ],
            }
        },
        {
            files: [ '*.vue' ],
            rules: {
                '@stylistic/indent-binary-ops': 'off',
                '@stylistic/indent': 'off',
                '@stylistic/max-len': 'off',
            }
        }
    ]
}
