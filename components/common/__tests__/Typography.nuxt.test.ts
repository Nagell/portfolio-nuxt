import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Typography from '../Typography.vue'

describe('Typography Component', async () => {
    it('renders correctly', async () => {
        const wrapper = await mountSuspended(Typography, {
            slots: {
                default: 'Test Content'
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders with the correct tag', async () => {
        const text = 'Test Content'
        const wrapper = await mountSuspended(Typography, {
            props: { tag: 'h2' },
            slots: {
                default: text
            }
        })
        expect(wrapper.find('h2').exists()).toBe(true)
        expect(wrapper.find('h2').text()).toBe(text)
    })

    it('applies custom class', async () => {
        const customClass = 'custom-typography-class'
        const wrapper = await mountSuspended(Typography, {
            props: { class: customClass },
            slots: {
                default: 'Test Content'
            }
        })
        expect(wrapper.classes()).toContain(customClass)
    })
})
