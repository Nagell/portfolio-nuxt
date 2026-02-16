import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import LogoWhite from '../LogoWhite.vue'

describe('LogoWhite Component', () => {
    it('renders correctly', async () => {
        const wrapper = await mountSuspended(LogoWhite)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('has the correct SVG structure', async () => {
        const wrapper = await mountSuspended(LogoWhite)
        const svg = wrapper.find('svg')

        expect(svg.exists()).toBe(true)
        expect(svg.attributes('xmlns')).toBe('http://www.w3.org/2000/svg')
    })
})
