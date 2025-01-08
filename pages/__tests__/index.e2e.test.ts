import { createPage, setup, url } from '@nuxt/test-utils/e2e'
import { describe, expect, it } from 'vitest'

import { setupOptions } from '~/pages/__tests__/testHelpers'
import testIds from '~/pages/__tests__/testIds'

describe('index Page', async () => {
    await setup(setupOptions)

    const page = await createPage()
    await page.goto(url('/'), { waitUntil: 'hydration' })

    it('about section renders correctly', async () => {
        const header = await page.getByTestId(testIds.index.about.header)
        const subHeader = await page.getByTestId(testIds.index.about.subHeader)
        const description = await page.getByTestId(testIds.index.about.description)
        const socialButtons = await page.getByTestId(testIds.index.about.socialButtons)

        expect(header).toBeDefined()
        expect(subHeader).toBeDefined()
        expect(description).toBeDefined()
        expect(socialButtons).toBeDefined()
    })

    it('hero renders correctly', async () => {
        const imageBackground = await page.getByTestId(testIds.index.hero.imageBackground)
        const imageText = await page.getByTestId(testIds.index.hero.imageText)

        expect(imageBackground).toBeDefined()
        expect(imageText).toBeDefined()
    })

    it('experience section renders correctly', async () => {
        const header = await page.getByTestId(testIds.index.experience.header)
        const items = await page.getByTestId(testIds.index.experience.items)
        const downloadCvButton = await page.getByTestId(testIds.index.experience.downloadCvButton)

        expect(header).toBeDefined()
        expect(items).toBeDefined()
        expect(downloadCvButton).toBeDefined()
    })

    it('projects section renders correctly', async () => {
        const header = await page.getByTestId(testIds.index.projects.header)
        const items = await page.getByTestId(testIds.index.projects.items)

        expect(header).toBeDefined()
        expect(items).toBeDefined()
    })

    it('footer renders correctly', async () => {
        const links = await page.getByTestId(testIds.index.footer.links)
        const socialButtons = await page.getByTestId(testIds.index.footer.socialButtons)

        expect(links).toBeDefined()
        expect(socialButtons).toBeDefined()
    })
})
