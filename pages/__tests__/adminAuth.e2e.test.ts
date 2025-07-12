import { describe, expect, it } from 'vitest'

import { URLS, createAdminTestSuite, createPage, url } from './helpers/adminTestBase'

createAdminTestSuite((authenticateUser) => {
    describe('Admin Authentication Flow', () => {
        it('should redirect to login when accessing admin pages without authentication', async () => {
            const adminPages = [ URLS.ADMIN_PROJECTS, URLS.ADMIN_EXPERIENCE, URLS.ADMIN_ASSETS ]

            // Navigate between admin pages
            for (const adminPage of adminPages) {
                const page = await createPage()
                await page.goto(url(adminPage), { waitUntil: 'hydration' })

                // Should redirect to login
                await page.waitForURL(`**${URLS.LOGIN}`)
                expect(page.url()).toContain(URLS.LOGIN)

                await page.close()
            }
        })

        it('should maintain authentication across admin pages', async () => {
            const page = await createPage()

            // Authenticate first
            await page.goto(url(URLS.ADMIN), { waitUntil: 'hydration' })
            await authenticateUser(page)

            const adminPages = [ URLS.ADMIN_PROJECTS, URLS.ADMIN_EXPERIENCE, URLS.ADMIN_ASSETS ]

            // Navigate between admin pages
            for (const adminPage of adminPages) {
                await page.goto(url(adminPage), { waitUntil: 'hydration' })

                // Should not redirect to login
                expect(page.url()).not.toContain(URLS.LOGIN)
                expect(page.url()).toContain(adminPage)

                // Wait a bit before navigating to next page
                await page.waitForTimeout(500)
            }
        })
    })
})
