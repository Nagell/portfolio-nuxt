import { describe, expect, it } from 'vitest'

import { URLS, createAdminTestSuite, createPage, url } from './helpers/adminTestBase'
import testIds from '../../utils/testIds'

import type { NuxtPage } from '@nuxt/test-utils'

createAdminTestSuite((authenticateUser) => {
    describe('Admin Projects Page', () => {
        const projectContent = {
            title: 'Test Project Title',
            description: 'Test Project Description',
            url: 'https://github.com/test-project',
            tags: 'testTag1, testTag2,',
        }

        // Search for the <tr> elements in the list
        const itemsLocator = `[data-testid="${testIds.admin.projects.projectList}"] tbody tr`

        async function findTestProjectInList(page: NuxtPage) {
            for (const value of Object.values(projectContent)) {
                const isValueInList = await page.locator(itemsLocator).filter({ hasText: value }).count() > 0

                if (isValueInList) return true
            }
            return false
        }

        it('should load projects admin page when authenticated', async () => {
            const page = await createPage()

            // Authenticate user
            await authenticateUser(page)

            // Navigate to projects page
            await page.goto(url(URLS.ADMIN_PROJECTS), { waitUntil: 'hydration' })

            // Check if projects page is loaded
            expect(page.url()).toContain(URLS.ADMIN_PROJECTS)

            // Look for project-related elements
            const projectLocators = [
                testIds.admin.projects.header,
                testIds.admin.projects.addProjectButton,
                testIds.admin.projects.projectList,
            ]

            for (const locator of projectLocators) {
                const element = page.getByTestId(locator)

                expect(await element.count()).toBeGreaterThan(0)
            }
        })

        it('should be able to add a new project', async () => {
            const page = await createPage()

            // Authenticate user
            await authenticateUser(page)

            // Navigate to projects page
            await page.goto(url(URLS.ADMIN_PROJECTS), { waitUntil: 'hydration' })

            // The test content should not be present in the initial list
            expect(await findTestProjectInList(page)).toBe(false)

            /* ADD NEW PROJECT */
            const button = page.getByTestId(testIds.admin.projects.addProjectButton)
            expect(await button.count()).toBe(1)
            await button.click()

            const dialogLocators = {
                wrapper: `[data-testid="${testIds.admin.projects.dialog.wrapper}"]`,
                title: `[data-testid="${testIds.admin.projects.dialog.title}"]`,
                description: `[data-testid="${testIds.admin.projects.dialog.description}"]`,
                image: `[data-testid="${testIds.admin.projects.dialog.image}"]`,
                imagePopover: `[data-testid="${testIds.admin.projects.dialog.imagePopover}"]`,
                url: `[data-testid="${testIds.admin.projects.dialog.url}"]`,
                tags: `[data-testid="${testIds.admin.projects.dialog.tags}"]`,
                saveButton: `[data-testid="${testIds.admin.projects.dialog.saveButton}"]`,
            }

            // Wait for the dialog to open
            await page.waitForSelector(dialogLocators.wrapper, { state: 'visible' })
            expect(await page.locator(dialogLocators.wrapper).count()).toBe(1)

            // Fill the form fields
            await page.fill(dialogLocators.title, projectContent.title)
            await page.fill(dialogLocators.description, projectContent.description)
            await page.locator(dialogLocators.image).click()

            // Assuming this opens a file picker
            await page.waitForSelector(dialogLocators.imagePopover, { state: 'visible' })
            await page.locator(dialogLocators.imagePopover).press('Enter')
            await page.fill(dialogLocators.url, projectContent.url)

            // Fill tags with two tags
            await page.locator(dialogLocators.tags).pressSequentially(projectContent.tags)

            // Click the save button
            const saveButton = page.locator(dialogLocators.saveButton)
            expect(await saveButton.count()).toBe(1)
            await saveButton.click()

            // Wait for the dialog to close
            await page.waitForSelector(dialogLocators.wrapper, { state: 'hidden' })
            expect(await page.locator(dialogLocators.wrapper).count()).toBe(0)

            // Wait a bit for the data to be saved and the list to update
            await page.waitForTimeout(100)

            // Check if any of the new project values can be found in the list
            expect(await findTestProjectInList(page)).toBe(true)
        })

        it('should delete previously created project', async () => {
            const page = await createPage()

            // Authenticate user
            await authenticateUser(page)

            // Navigate to projects page
            await page.goto(url(URLS.ADMIN_PROJECTS), { waitUntil: 'hydration' })

            // Ensure there is the project added in the previous test
            expect(await findTestProjectInList(page)).toBe(true)

            // Click the action button on the first project
            const projectActionButton = page.locator(itemsLocator).first().getByRole('button')
            expect(await projectActionButton.count()).toBeGreaterThan(0)
            await projectActionButton.click()

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
            await page.waitForTimeout(100)

            // The test content should not be present anymore
            expect(await findTestProjectInList(page)).toBe(false)
        })
    })
})
