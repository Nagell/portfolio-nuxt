import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import ExternalLink from '../ExternalLink.vue'
import CommonTypography from '../Typography.vue'

describe('ExternalLink', () => {
    it('renders button when onClick is provided', () => {
        const onClick = vi.fn()
        const wrapper = mount(ExternalLink, {
            props: { onClick }
        })

        expect(wrapper.find('button').exists()).toBe(true)
        expect(wrapper.find('button').attributes('class')).toContain('group')
    })

    it('renders NuxtLink when href is provided', () => {
        const href = 'https://example.com'
        const wrapper = mount(ExternalLink, {
            props: { href }
        })

        expect(wrapper.find('a').exists()).toBe(true)
        expect(wrapper.find('a').attributes('href')).toBe(href)
        expect(wrapper.find('a').attributes('target')).toBe('_blank')
        expect(wrapper.find('a').attributes('rel')).toBe('noopener noreferrer')
    })

    it('renders CommonTypography when neither onClick nor href is provided', () => {
        const wrapper = mount(ExternalLink)

        expect(wrapper.findComponent(CommonTypography).exists()).toBe(true)
    })
})
