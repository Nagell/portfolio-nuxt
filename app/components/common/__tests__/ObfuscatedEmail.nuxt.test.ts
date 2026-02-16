import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'

import ObfuscatedEmail from '../ObfuscatedEmail.vue'

describe('ObfuscatedEmail Component', () => {
    it('renders correctly', async () => {
        const wrapper = await mountSuspended(ObfuscatedEmail)

        expect(wrapper.html()).toMatchSnapshot()
    })

    it('contains all data attributes necessary for creation of an email', async () => {
        const wrapper = await mountSuspended(ObfuscatedEmail)

        expect(wrapper.attributes()['data-name']).toBeDefined()
        expect(wrapper.attributes()['data-domain']).toBeDefined()
        expect(wrapper.attributes()['data-tld']).toBeDefined()
    })

    it('on click calls the window open with a "mailto"', async () => {
        const wrapper = await mountSuspended(ObfuscatedEmail)
        const windowOpenSpy = vi.spyOn(window, 'open')

        const name = wrapper.attributes()['data-name']
        const domain = wrapper.attributes()['data-domain']
        const tld = wrapper.attributes()['data-tld']
        const expectedCall = `mailto:${name}@${domain}.${tld}`

        wrapper.trigger('click')

        expect(windowOpenSpy).toHaveBeenCalledWith(
            expectedCall,
            '_blank'
        )
    })
})
