import { describe, expect, it } from 'vitest'

import { URLS, createAdminTestSuite, createPage, url } from './helpers/adminTestBase'
import testIds from '../../utils/testIds'

import type { NuxtPage } from '@nuxt/test-utils'

createAdminTestSuite((authenticateUser) => {
    describe('Admin Experience Page', () => {
        const experienceContent = {
            title: 'Test Experience Title',
            url: 'https://test.com',
            description: 'Test Experience Description',
            tags: 'testTag1, testTag2,',
        }

        // Search for the <tr> elements in the list
        const itemsLocator = `[data-testid="${testIds.admin.experience.experienceList}"] tbody tr`

        async function findTestExperienceInList(page: NuxtPage) {
            for (const value of Object.values(experienceContent)) {
                const isValueInList = await page.locator(itemsLocator).filter({ hasText: value }).count() > 0

                if (isValueInList) return true
            }
            return false
        }

        it('should load experience admin page when authenticated', async () => {
            const page = await createPage()

            // Authenticate user
            await authenticateUser(page)

            // Navigate to experience page
            await page.goto(url(URLS.ADMIN_EXPERIENCE), { waitUntil: 'hydration' })

            // Check if experience page is loaded
            expect(page.url()).toContain(URLS.ADMIN_EXPERIENCE)

            // Look for experience-related elements
            const experienceLocators = [
                testIds.admin.experience.header,
                testIds.admin.experience.addExperienceButton,
                testIds.admin.experience.experienceList,
            ]

            for (const locator of experienceLocators) {
                const element = page.getByTestId(locator)

                expect(await element.count()).toBeGreaterThan(0)
            }
        })

        it('should be able to add a new experience and remove it', async () => {
            const page = await createPage()

            // Authenticate user
            await authenticateUser(page)

            // Navigate to experience page
            await page.goto(url(URLS.ADMIN_EXPERIENCE), { waitUntil: 'hydration' })

            // The test content should not be present in the initial list
            expect(await findTestExperienceInList(page)).toBe(false)

            /* ADD NEW EXPERIENCE */
            const button = page.getByTestId(testIds.admin.experience.addExperienceButton)
            expect(await button.count()).toBe(1)
            await button.click()

            const dialogLocators = {
                wrapper: `[data-testid="${testIds.admin.experience.dialog.wrapper}"]`,
                title: `[data-testid="${testIds.admin.experience.dialog.title}"]`,
                url: `[data-testid="${testIds.admin.experience.dialog.url}"]`,
                description: `[data-testid="${testIds.admin.experience.dialog.description}"]`,
                startDate: `[data-testid="${testIds.admin.experience.dialog.startDate}"]`,
                startDatePopover: `[data-testid="${testIds.admin.experience.dialog.startDatePopover}"]`,
                endDate: `[data-testid="${testIds.admin.experience.dialog.endDate}"]`,
                endDatePopover: `[data-testid="${testIds.admin.experience.dialog.endDatePopover}"]`,
                tags: `[data-testid="${testIds.admin.experience.dialog.tags}"]`,
                saveButton: `[data-testid="${testIds.admin.experience.dialog.saveButton}"]`,
            }

            // Wait for the dialog to open
            await page.waitForSelector(dialogLocators.wrapper, { state: 'visible' })
            expect(await page.locator(dialogLocators.wrapper).count()).toBe(1)

            // Fill the form fields
            await page.fill(dialogLocators.title, experienceContent.title)
            await page.fill(dialogLocators.url, experienceContent.url)
            await page.fill(dialogLocators.description, experienceContent.description)

            await page.locator(dialogLocators.startDate).click()

            // Assuming this opens a calendar popover
            await page.waitForSelector(dialogLocators.startDatePopover, { state: 'visible' })
            await page.keyboard.press('Tab')
            await page.keyboard.press('Enter')
            await page.keyboard.press('Escape')

            await page.locator(dialogLocators.endDate).click()
            // Assuming this opens a calendar popover
            await page.waitForSelector(dialogLocators.endDatePopover, { state: 'visible' })
            await page.keyboard.press('Tab')
            await page.keyboard.press('Enter')
            await page.keyboard.press('Escape')

            // Fill tags with two tags
            await page.locator(dialogLocators.tags).pressSequentially(experienceContent.tags)

            // Click the save button
            const saveButton = page.locator(dialogLocators.saveButton)
            expect(await saveButton.count()).toBe(1)
            await saveButton.click()

            // Wait for the dialog to close
            await page.waitForSelector(dialogLocators.wrapper, { state: 'hidden' })
            expect(await page.locator(dialogLocators.wrapper).count()).toBe(0)

            // Wait a bit for the data to be saved and the list to update
            await page.waitForTimeout(1000)

            // Check if any of the new experience values can be found in the list
            expect(await findTestExperienceInList(page)).toBe(true)

            /* REMOVE EXPERIENCE */
            // Click the action button on the first experience
            const experienceActionButton = page.locator(itemsLocator).first().getByRole('button')
            expect(await experienceActionButton.count()).toBeGreaterThan(0)
            await experienceActionButton.click()

            // Wait for the action menu to appear
            const actionMenuLocator = `[data-testid="${testIds.admin.dataTableDropdown.wrapper}"]`
            const actionMenu = page.locator(actionMenuLocator)
            await page.waitForSelector(actionMenuLocator, { state: 'visible' })
            expect(await actionMenu.count()).toBe(1)

            // Click the delete button
            const deleteButton = actionMenu.getByTestId(testIds.admin.dataTableDropdown.delete)
            expect(await deleteButton.count()).toBe(1)
            await deleteButton.click()

            // Wait for the deletion to be processed
            await page.waitForTimeout(1000)

            // The test content should not be present anymore
            expect(await findTestExperienceInList(page)).toBe(false)
        })
    })
})
