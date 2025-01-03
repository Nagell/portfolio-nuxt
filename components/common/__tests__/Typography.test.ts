import { mount, shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Typography from '../Typography.vue'

describe('Typography', () => {
    it('renders correctly', () => {
        const wrapper = mount(Typography, {
            slots: {
                default: 'Test Content'
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders with the correct tag', () => {
        const text = 'Test Content'
        const wrapper = mount(Typography, {
            props: { tag: 'h2' },
            slots: {
                default: text
            }
        })
        expect(wrapper.find('h2').exists()).toBe(true)
        expect(wrapper.find('h2').text()).toBe(text)
    })

    it('applies custom class', () => {
        const customClass = 'custom-typography-class'
        const wrapper = mount(Typography, {
            props: { class: customClass },
            slots: {
                default: 'Test Content'
            }
        })
        expect(wrapper.classes()).toContain(customClass)
    })
})
