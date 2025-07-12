import { describe, expect, it } from 'vitest'

import { URLS, createAdminTestSuite, createPage, url } from './helpers/adminTestBase'
import testIds from '../../utils/testIds'

createAdminTestSuite((authenticateUser) => {
    describe('Admin Assets Page', () => {
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
        })
    })
})
