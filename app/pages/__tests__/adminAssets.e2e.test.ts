import { describe, expect, it } from 'vitest'

import { URLS, createAdminTestSuite, createPage, url } from './helpers/adminTestBase'
import { createTestFile } from './helpers/assetHelper'
import testIds from '../../utils/testIds'

import type { NuxtPage } from '@nuxt/test-utils'

createAdminTestSuite((authenticateUser) => {
    describe('Admin Assets Page', () => {
        const addButtonLocator = `[data-testid="${testIds.admin.assets.addAssetButton}"]`
        const itemsLocator = `[data-testid="${testIds.admin.assets.assetList}"] tbody tr`
        const actionMenuLocator = `[data-testid="${testIds.admin.dataTableDropdown.wrapper}"]`
        const deleteButtonLocator = `[data-testid="${testIds.admin.dataTableDropdown.delete}"]`

        const dialogLocators = {
            wrapper: `[data-testid="${testIds.admin.assets.dialog.wrapper}"]`,
            fileInput: `[data-testid="${testIds.admin.assets.dialog.fileInput}"]`,
            saveButton: `[data-testid="${testIds.admin.assets.dialog.saveButton}"]`,
        }

        async function findTestAssetInList(page: NuxtPage, fileName: string): Promise<boolean> {
            return await page.locator(itemsLocator).filter({ hasText: fileName }).count() > 0
        }

        it('should load assets admin page when authenticated', async () => {
            const page = await createPage()

            // Authenticate user
            await authenticateUser(page)

            // Navigate to assets page
            await page.goto(url(URLS.ADMIN_ASSETS), { waitUntil: 'hydration' })

            // Check if assets page is loaded
            expect(page.url()).toContain(URLS.ADMIN_ASSETS)

            // Look for asset-related elements
            const assetLocators = [
                testIds.admin.assets.header,
                testIds.admin.assets.addAssetButton,
                testIds.admin.assets.assetList,
            ]
            for (const locator of assetLocators) {
                const element = page.getByTestId(locator)

                expect(await element.count()).toBeGreaterThan(0)
            }

            await page.close()
        })

        it('should be able to upload a new asset and remove it', async () => {
            const page = await createPage()

            // Authenticate user
            await authenticateUser(page)

            // Navigate to assets page
            await page.goto(url(URLS.ADMIN_ASSETS), { waitUntil: 'hydration' })

            const testFileName = 'test-image.png'

            // The test asset should not be present in the initial list
            expect(await findTestAssetInList(page, testFileName)).toBe(false)

            /* ADD NEW ASSET */
            const addButton = page.locator(addButtonLocator)
            expect(await addButton.count()).toBe(1)
            await addButton.click()

            // Wait for the dialog to open
            await page.waitForSelector(dialogLocators.wrapper, { state: 'visible' })
            expect(await page.locator(dialogLocators.wrapper).count()).toBe(1)

            // Fill the form fields
            const testPNGFile = createTestFile(testFileName, 'png')
            await page.locator(dialogLocators.fileInput).setInputFiles(testPNGFile)

            /// Click the save button
            const saveButton = page.locator(dialogLocators.saveButton)
            expect(await saveButton.count()).toBe(1)
            await saveButton.click()

            // Wait for the dialog to close
            await page.waitForSelector(dialogLocators.wrapper, { state: 'hidden' })
            expect(await page.locator(dialogLocators.wrapper).count()).toBe(0)

            // Wait a bit for the data to be saved and the list to update
            await page.waitForTimeout(1000)

            // Check if the uploaded asset appears in the list
            expect(await findTestAssetInList(page, testFileName)).toBe(true)

            /* REMOVE ASSET */
            // Wait for the page to fully settle before interacting with the menu
            await page.waitForLoadState('networkidle')

            // Click the action button on the asset
            const assetRow = page.locator(itemsLocator).filter({ hasText: testFileName }).first()
            const actionButton = assetRow.getByRole('button')
            expect(await actionButton.count()).toBeGreaterThan(0)
            await actionButton.click()

            // Wait for the action menu to appear
            await page.waitForSelector(actionMenuLocator, { state: 'visible' })
            const actionMenu = page.locator(actionMenuLocator)
            expect(await actionMenu.count()).toBe(1)

            // Click the delete button
            const deleteButton = actionMenu.locator(deleteButtonLocator)
            expect(await deleteButton.count()).toBe(1)
            await deleteButton.click()

            // Wait for the deletion to be processed
            await page.waitForTimeout(1000)

            // The test asset should not be present anymore
            expect(await findTestAssetInList(page, testFileName)).toBe(false)

            await page.close()
        })

        it('should handle multiple file uploads', async () => {
            const page = await createPage()

            // Authenticate user
            await authenticateUser(page)

            // Navigate to assets page
            await page.goto(url(URLS.ADMIN_ASSETS), { waitUntil: 'hydration' })

            // Click add button
            const addButton = page.locator(addButtonLocator)
            await addButton.click()
            await page.waitForTimeout(500)

            // Create multiple test files
            const testFiles = [
                createTestFile('test-image-1.png', 'png'),
                createTestFile('test-image-2.png', 'png')
            ]

            // Upload multiple files at once
            await page.locator(dialogLocators.fileInput).setInputFiles(testFiles)

            // Submit the form
            const saveButton = page.locator(dialogLocators.saveButton)
            await saveButton.click()

            // Wait for uploads to complete
            await page.waitForTimeout(3000)

            // Check that both files appear in the list
            for (const file of testFiles) {
                expect(await findTestAssetInList(page, file.name)).toBe(true)
            }

            // Clean up - remove the uploaded files
            for (const file of testFiles) {
                const assetRow = page.locator(itemsLocator).filter({ hasText: file.name }).first()
                const actionButton = assetRow.getByRole('button')
                await actionButton.click()

                const actionMenu = page.locator(actionMenuLocator)
                await page.waitForSelector(actionMenuLocator, { state: 'visible' })
                const deleteButton = actionMenu.locator(deleteButtonLocator)
                await deleteButton.click()
                await page.waitForTimeout(1000)
            }

            await page.close()
        })

        it('should validate file type restrictions', async () => {
            const page = await createPage()

            // Authenticate user
            await authenticateUser(page)

            // Navigate to assets page
            await page.goto(url(URLS.ADMIN_ASSETS), { waitUntil: 'hydration' })

            // Click add button
            const addButton = page.locator(addButtonLocator)
            await addButton.click()
            await page.waitForTimeout(500)

            // Try to upload an invalid file type (e.g., a text file)
            const invalidFile = createTestFile('test-document.txt', 'txt')

            await page.locator(dialogLocators.fileInput).setInputFiles(invalidFile)

            await page.waitForTimeout(1000)

            // Check for validation error message
            const errorMessage = page.locator('[role="alert"]')
            expect(await errorMessage.count()).toBeGreaterThan(0)

            await page.close()
        })
    })
})
