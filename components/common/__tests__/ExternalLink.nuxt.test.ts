import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'

import ExternalLink from '../ExternalLink.vue'
import CommonTypography from '../Typography.vue'

describe('ExternalLink Component', async () => {
    it('renders button when onClick is provided', async () => {
        const onClick = vi.fn()
        const wrapper = await mountSuspended(ExternalLink, {
            props: { onClick }
        })

        expect(wrapper.find('button').exists()).toBe(true)
        expect(wrapper.find('button').attributes('class')).toContain('group')
    })

    it('renders NuxtLink when href is provided', async () => {
        const href = 'https://example.com'
        const wrapper = await mountSuspended(ExternalLink, {
            props: { href }
        })

        expect(wrapper.find('a').exists()).toBe(true)
        expect(wrapper.find('a').attributes('href')).toBe(href)
        expect(wrapper.find('a').attributes('target')).toBe('_blank')
        expect(wrapper.find('a').attributes('rel')).toBe('noopener noreferrer')
    })

    it('renders CommonTypography when neither onClick nor href is provided', async () => {
        const wrapper = await mountSuspended(ExternalLink)

        expect(wrapper.findComponent(CommonTypography).exists()).toBe(true)
    })
})
