import { type NuxtPage, createPage, setup, url } from '@nuxt/test-utils/e2e'
import { beforeAll, describe, expect, it } from 'vitest'

import { URLS } from './helpers/urlHelper'
import { setupOptions } from './helpers/vitestConfig'
import testIds from '../../utils/testIds'

describe('Home Page E2E Tests', () => {
    let page: NuxtPage

    beforeAll(async () => {
        await setup(setupOptions)
        page = await createPage()
        await page.goto(url(URLS.HOME), { waitUntil: 'hydration' })
    })

    it('about section renders correctly', async () => {
        const header = page.getByTestId(testIds.index.about.header)
        const subHeader = page.getByTestId(testIds.index.about.subHeader)
        const description = page.getByTestId(testIds.index.about.description)
        const socialButtons = page.getByTestId(testIds.index.about.socialButtons)

        expect(header).toBeDefined()
        expect(subHeader).toBeDefined()
        expect(description).toBeDefined()
        expect(socialButtons).toBeDefined()
    })

    it('social buttons open correct links', async () => {
        const socialButtons = page.getByTestId(testIds.index.about.socialButtons)
        const links = await socialButtons.locator('a').all()

        // Caution: This test will not work if the browser is visible and slowMo is enabled
        // We are then not being logged in to the social media accounts and the links will redirect to the login page
        for (const link of links) {
            const newPagePromise = page.waitForEvent('popup')
            const href = await link.getAttribute('href')

            await link.click()

            const newPage = await newPagePromise
            const newPageUrl = newPage.url()

            expect(newPageUrl).toBe(href)
        }
    })

    it('hero renders correctly', async () => {
        const imageBackground = page.getByTestId(testIds.index.hero.imageBackground)
        const imageText = page.getByTestId(testIds.index.hero.imageText)

        expect(imageBackground).toBeDefined()
        expect(imageText).toBeDefined()
    })

    it('imageBackground and imageText have valid image sources', async () => {
        const imageBackground = page.getByTestId(testIds.index.hero.imageBackground)
        const imageText = page.getByTestId(testIds.index.hero.imageText)

        const bgSrc = await imageBackground.evaluate(
            (img: HTMLImageElement) => img.src
        )
        const textSrc = await imageText.evaluate(
            (img: HTMLImageElement) => img.src
        )

        expect(bgSrc).toContain('window.webp')
        expect(textSrc).toContain('text.webp')
    })

    it('experience section renders correctly', async () => {
        const header = page.getByTestId(testIds.index.experience.header)
        const items = page.getByTestId(testIds.index.experience.items)
        const downloadCvButton = page.getByTestId(testIds.index.experience.downloadCvButton)

        expect(header).toBeDefined()
        expect(items).toBeDefined()
        expect(downloadCvButton).toBeDefined()
    })

    it('CV is being downloaded', async () => {
        const errors: string[] = []
        const logs: string[] = []
        page.on('console', (msg) => {
            if (msg.type() === 'error') errors.push(msg.text())
            logs.push(`[${msg.type()}] ${msg.text()}`)
        })

        const downloadCvButton = page.getByTestId(testIds.index.experience.downloadCvButton)

        // Diagnose what element we're actually clicking
        const elementInfo = await downloadCvButton.evaluate(el => ({
            tagName: el.tagName,
            isConnected: el.isConnected,
            innerText: el.textContent?.trim().slice(0, 50),
            hasClickListeners: !!(el as HTMLElement).onclick,
            boundingBox: el.getBoundingClientRect().toJSON(),
        }))

        const pageUrlBefore = page.url()

        // Intercept the API call to verify it succeeds
        const responsePromise = page.waitForResponse(
            resp => resp.url().includes('/api/assets'),
            { timeout: 30000 }
        )

        const downloadPromise = page.waitForEvent('download', { timeout: 30000 })

        await downloadCvButton.click()

        const apiResponse = await responsePromise.catch(() => null)
        const apiStatus = apiResponse?.status()
        const apiContentType = apiResponse?.headers()['content-type']
        const pageUrlAfter = page.url()

        const download = await downloadPromise.catch((err) => {
            console.error('Download event not fired.', {
                elementInfo,
                pageUrlBefore,
                pageUrlAfter,
                apiStatus,
                apiContentType,
                consoleErrors: errors,
                consoleLogs: logs,
            })
            throw err
        })

        expect(download.suggestedFilename()).toBe(import.meta.env.VITE_CV_FILE_NAME)
    })

    it('projects section renders correctly', async () => {
        const header = page.getByTestId(testIds.index.projects.header)
        const items = page.getByTestId(testIds.index.projects.items)

        expect(header).toBeDefined()
        expect(items).toBeDefined()
    })

    it('projects cards open correctly', async () => {
        const items = page.getByTestId(testIds.index.projects.items)
        const button = items.getByRole('button').first()
        expect(button).toBeDefined()

        // no open dialog content yet
        const dialogContent = page.getByTestId(testIds.index.projects.dialogContent)
        const dialogContentText = await dialogContent.allInnerTexts()
        expect(dialogContentText).toStrictEqual([])

        const header = await button.getByRole('heading').innerText()
        expect(header).toBeDefined()

        await button.click()

        // open dialog content
        expect(dialogContent).toBeDefined()

        const dialogHeader = await dialogContent.getByRole('heading').innerText()
        expect(dialogHeader).toBe(header)
    })

    it('footer renders correctly', async () => {
        const links = page.getByTestId(testIds.index.footer.links)
        const socialButtons = page.getByTestId(testIds.index.footer.socialButtons)

        expect(links).toBeDefined()
        expect(socialButtons).toBeDefined()
    })
})
