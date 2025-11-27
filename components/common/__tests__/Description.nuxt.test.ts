import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Description from '../Description.vue'

const multilineText = `Test description
with multiple lines
of text`

const singleLineText = 'Test description with multiple lines of text'

describe('Description Component', () => {
    describe('default', () => {
        it('renders correctly', async () => {
            const wrapper = await mountSuspended(Description, {
                props: {
                    description: multilineText,
                },
            })
            expect(wrapper.html()).toMatchSnapshot()
        })

        it('text is split into multiple lines in "li" tags', async () => {
            const wrapper = await mountSuspended(Description, {
                props: {
                    description: multilineText,
                },
            })
            expect(wrapper.html()).not.toContain(singleLineText)
            expect(wrapper.findAll('ul').length).toBe(1)
            expect(wrapper.findAll('li').length).toBe(3)
        })
    })

    describe('p', () => {
        it('renders correctly', async () => {
            const wrapper = await mountSuspended(Description, {
                props: {
                    description: multilineText,
                    type: 'p'
                },
            })
            expect(wrapper.html()).toMatchSnapshot()
        })

        it('text is split into multiple lines in "p" tags', async () => {
            const wrapper = await mountSuspended(Description, {
                props: {
                    description: multilineText,
                    type: 'p'
                },
            })
            expect(wrapper.html()).not.toContain(singleLineText)
            expect(wrapper.findAll('p').length).toBe(3)
        })
    })
})
