import { type NuxtPage, createPage, setup, url } from '@nuxt/test-utils/e2e'
import { afterAll, beforeAll, describe } from 'vitest'

import { URLS } from './urlHelper'
import {
    createTestBrowserSession,
    createTestSupabaseClient,
    createTestUser,
    signOutTestUser
} from './userHelper'
import { setupOptions } from './vitestConfig'

/**
 * Base test wrapper for admin area E2E tests
 * Provides common setup, teardown, and authentication utilities
 */
export function createAdminTestSuite(
    testFn: (authenticateUser: (page: NuxtPage) => Promise<boolean>) => void
) {
    return describe('Admin Area Tests', async () => {
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
        async function authenticateUser(page: NuxtPage): Promise<boolean> {
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

        // Execute the test function with the authenticateUser helper
        testFn(authenticateUser)
    })
}

// Export common utilities that might be needed by individual test files
export { createPage, url, URLS }
