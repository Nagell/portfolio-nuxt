import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Section from '../Section.vue'

describe('Section Component', async () => {
    it('renders correctly', async () => {
        const wrapper = await mountSuspended(Section, {
            slots: {
                default: '<div class="test-content">Test Content</div>'
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders slot content', async () => {
        const wrapper = await mountSuspended(Section, {
            slots: {
                default: '<div class="test-content">Test Content</div>'
            }
        })
        expect(wrapper.find('.test-content').exists()).toBe(true)
        expect(wrapper.find('.test-content').text()).toBe('Test Content')
    })

    it('applies custom class', async () => {
        const customClass = 'custom-section-class'
        const wrapper = await mountSuspended(Section, {
            props: { class: customClass }
        })
        expect(wrapper.classes()).toContain(customClass)
    })

    it('renders heading when provided', async () => {
        const heading = 'Test Heading'
        const wrapper = await mountSuspended(Section, {
            props: { heading }
        })
        expect(wrapper.find('h1').exists()).toBe(true)
        expect(wrapper.find('h1').text()).toBe(heading)
    })
})
