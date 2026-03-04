import stylistic from '@stylistic/eslint-plugin'
import * as importX from 'eslint-plugin-import-x'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import globals from 'globals'

export default [
    // Import-x flat configs (registers plugin + recommended rules)
    importX.flatConfigs.recommended,
    importX.flatConfigs.typescript,

    // Main config: stylistic + import-x overrides
    {
        files: [ '**/*.ts', '**/*.tsx', '**/*.js', '**/*.cjs', '**/*.jsx', '**/*.vue' ],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2022,
            },
            ecmaVersion: 2022,
            sourceType: 'module',
        },
        plugins: {
            '@stylistic': stylistic,
        },
        settings: {
            'import-x/resolver-next': [
                createTypeScriptImportResolver({
                    project: './tsconfig.json',
                }),
            ],
        },
        rules: {
            // @stylistic formatting
            '@stylistic/indent': [ 'warn', 4 ],
            '@stylistic/comma-dangle': [ 'warn', 'only-multiline' ],
            '@stylistic/array-bracket-spacing': [ 'warn', 'always' ],
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
                    ignoreRegExpLiterals: true,
                },
            ],
            '@stylistic/indent-binary-ops': [ 'warn', 4 ],

            // Built-in sort-imports
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

            // import-x rules
            'import-x/no-unresolved': 'off', // Nuxt auto-imports cause false positives
            'import-x/order': [
                'error',
                {
                    'groups': [
                        'builtin',
                        'external',
                        'internal',
                        [ 'sibling', 'parent' ],
                        'index',
                        'unknown',
                        'type',
                    ],
                    'pathGroupsExcludedImportTypes': [ 'builtin', 'object' ],
                    'newlines-between': 'always',
                    'alphabetize': {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
        },
    },

    // Vue-specific stylistic overrides
    {
        files: [ '**/*.vue' ],
        rules: {
            '@stylistic/indent-binary-ops': 'off',
            '@stylistic/indent': 'off',
            '@stylistic/max-len': 'off',
        },
    },
]
