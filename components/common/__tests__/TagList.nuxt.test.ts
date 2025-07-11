import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import TagList from '../TagList.vue'

describe('TagList Component', async () => {
    it('renders correctly when tags are provided', async () => {
        const tags = [ 'Vue', 'Nuxt', 'TypeScript' ]
        const wrapper = await mountSuspended(TagList, {
            props: { tags }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders no content when tags are not provided', async () => {
        const wrapper = await mountSuspended(TagList, {
            props: { tags: [] }
        })
        const div = wrapper.find('div')

        expect(div.exists()).toBe(false)
    })

    it('renders all tags correctly', async () => {
        const tags = [ 'Vue', 'Nuxt', 'TypeScript' ]
        const wrapper = await mountSuspended(TagList, {
            props: { tags }
        })
        const badges = wrapper.findAllComponents({ name: 'Badge' })

        expect(badges.length).toBe(tags.length)
        tags.forEach((tag, index) => {
            expect(badges[index].text()).toBe(tag)
        })
    })
})
