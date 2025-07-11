import { type NuxtPage, createPage, setup, url } from '@nuxt/test-utils/e2e'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { URLS } from './helpers/urlHelper'
import {
    createTestBrowserSession,
    createTestSupabaseClient,
    createTestUser,
    signOutTestUser
} from './helpers/userHelper'
import { setupOptions } from './helpers/vitestConfig'
import testIds from './testIds'

describe('Admin Area E2E Tests', async () => {
    await setup(setupOptions)

    const supabase = createTestSupabaseClient()

    beforeAll(async () => {
        // Ensure test user exists
        await createTestUser(supabase)
    })

    afterAll(async () => {
        // Clean up - sign out test user
        await signOutTestUser(supabase)
    })

    /**
     * Helper function to authenticate user in browser
     * Using real Supabase session creation
     */
    async function authenticateUser(page: NuxtPage) {
        // Use the existing createTestBrowserSession function which creates a real session with cookies
        // This simulates what happens after successful OAuth
        const success = await createTestBrowserSession(page)
        if (!success) {
            throw new Error('Failed to create test session')
        }
        // Wait a bit for the session to be processed
        await page.waitForTimeout(100)
        return true
    }

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

    describe('Admin Projects Page', () => {
        it('should load projects admin page when authenticated', async () => {
            const page = await createPage()

            // Authenticate user
            await authenticateUser(page)

            // Navigate to projects page
            await page.goto(url(URLS.ADMIN_PROJECTS), { waitUntil: 'hydration' })

            // Check if projects page is loaded
            expect(page.url()).toContain(URLS.ADMIN_PROJECTS)

            // Look for project-related elements
            const projectElements = [
                `[data-testid="${testIds.admin.projects.header}"]`,
                `[data-testid="${testIds.admin.projects.addProjectButton}"]`,
                `[data-testid="${testIds.admin.projects.projectList}"]`,
            ]

            for (const selector of projectElements) {
                const element = page.locator(selector)

                expect(await element.count()).toBeGreaterThan(0)
            }
        })
    })

    describe('Admin Experience Page', () => {
        it('should load experience admin page when authenticated', async () => {
            const page = await createPage()

            // Authenticate user
            await authenticateUser(page)

            // Navigate to experience page
            await page.goto(url(URLS.ADMIN_EXPERIENCE), { waitUntil: 'hydration' })

            // Check if experience page is loaded
            expect(page.url()).toContain(URLS.ADMIN_EXPERIENCE)

            // Look for experience-related elements
            const experienceElements = [
                `[data-testid="${testIds.admin.experience.header}"]`,
                `[data-testid="${testIds.admin.experience.addExperienceButton}"]`,
                `[data-testid="${testIds.admin.experience.experienceList}"]`,
            ]

            for (const selector of experienceElements) {
                const element = page.locator(selector)

                expect(await element.count()).toBeGreaterThan(0)
            }
        })
    })

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
            const assetElements = [
                `[data-testid="${testIds.admin.assets.header}"]`,
                `[data-testid="${testIds.admin.assets.addAssetButton}"]`,
                `[data-testid="${testIds.admin.assets.assetList}"]`,
            ]
            for (const selector of assetElements) {
                const element = page.locator(selector)

                expect(await element.count()).toBeGreaterThan(0)
            }
        })
    })
})
