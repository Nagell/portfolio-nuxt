import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'

import ObfuscatedEmail from '../ObfuscatedEmail.vue'

describe('ObfuscatedEmail', () => {
    it('renders correctly', async () => {
        const component = await mountSuspended(ObfuscatedEmail)

        expect(component.html()).toMatchSnapshot()
    })

    it('contains all data attributes necessary for creation of an email', async () => {
        const component = await mountSuspended(ObfuscatedEmail)

        expect(component.attributes()['data-name']).toBeDefined()
        expect(component.attributes()['data-domain']).toBeDefined()
        expect(component.attributes()['data-tld']).toBeDefined()
    })

    it('on click calls the window open with a "mailto"', async () => {
        const component = await mountSuspended(ObfuscatedEmail)
        const windowOpenSpy = vi.spyOn(window, 'open')

        const name = component.attributes()['data-name']
        const domain = component.attributes()['data-domain']
        const tld = component.attributes()['data-tld']
        const expectedCall = `mailto:${name}@${domain}.${tld}`

        component.trigger('click')

        expect(windowOpenSpy).toHaveBeenCalledWith(
            expectedCall,
            '_blank'
        )
    })
})
