import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import Social from '../Social.vue'

describe('Social', async () => {
    it('renders correctly', async () => {
        const wrapper = await mountSuspended(Social)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders all social links', async () => {
        const wrapper = await mountSuspended(Social)
        const links = wrapper.findAll('a')

        expect(links.length).toBe(4)
        expect(links[0].attributes('aria-label')).toBe('LinkedIn - external link')
        expect(links[1].attributes('aria-label')).toBe('Xing - external link')
        expect(links[2].attributes('aria-label')).toBe('Medium - external link')
        expect(links[3].attributes('aria-label')).toBe('GitHub - external link')
    })

    it('applies custom class', async () => {
        const customClass = 'custom-social-class'
        const wrapper = await mountSuspended(Social, {
            props: { class: customClass }
        })
        expect(wrapper.classes()).toContain(customClass)
    })
})
