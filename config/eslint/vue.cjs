module.exports = {
    overrides: [
        {
            files: [ '*.ts', '*.tsx', '*.js', '*.jsx', '*.vue' ],
            extends: [
                'plugin:vue/vue3-recommended',
                '@vue/eslint-config-typescript'
            ],
            rules: {
                'vue/block-order': [
                    'warn',
                    {
                        order: [ 'docs', 'template', 'script', 'style' ]
                    }
                ],
                'vue/max-len': [
                    'warn',
                    {
                        code: 120,
                        template: 120,
                        tabWidth: 4,
                        comments: 120,
                        ignorePattern: '',
                        ignoreComments: false,
                        ignoreTrailingComments: false,
                        ignoreUrls: true,
                        ignoreStrings: true,
                        ignoreTemplateLiterals: true,
                        ignoreRegExpLiterals: true,
                        ignoreHTMLAttributeValues: false,
                        ignoreHTMLTextContents: false
                    }
                ],
                'vue/no-unused-components': [
                    'warn',
                    {
                        ignoreWhenBindingPresent: true
                    }
                ],
                'vue/no-unused-vars': [
                    'warn'
                ],
                /* experiment - lets try it out */
                'vue/no-ref-object-reactivity-loss': [
                    'warn'
                ],
                'vue/no-v-html': [
                    'warn'
                ],
                'vue/operator-linebreak': [
                    'warn',
                    'before'
                ],

                'vue/multiline-html-element-content-newline': [
                    'warn',
                    {
                        ignoreWhenEmpty: true,
                        ignores: [
                            'pre',
                            'textarea'
                        ],
                        allowEmptyLines: false
                    }
                ],
                'vue/singleline-html-element-content-newline': [
                    'warn',
                    {
                        ignoreWhenNoAttributes: true,
                        ignoreWhenEmpty: true,
                        ignores: [
                            'pre',
                            'textarea'
                        ]
                    }
                ],

                'vue/html-indent': [
                    'warn',
                    4,
                    {
                        attribute: 1,
                        baseIndent: 1,
                        closeBracket: 0,
                        alignAttributesVertically: true
                    }
                ],
                'vue/script-indent': [
                    'warn',
                    4,
                    {
                        baseIndent: 1
                    }
                ],

                'vue/multi-word-component-names': [
                    'warn'
                ],
                'vue/no-reserved-component-names': [
                    'warn'
                ]
            }
        }
    ],
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly'
    }
}
