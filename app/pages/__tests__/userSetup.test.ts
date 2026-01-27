import { describe, expect, it } from 'vitest'

import {
    createTestSupabaseClient,
    createTestUser,
    getTestUser,
    getTestUserSession,
    signInTestUser,
    signOutTestUser,
    testUser
} from './helpers/userHelper'

describe('User Setup', () => {
    const supabase = createTestSupabaseClient()

    it('should create test user successfully or login an existing one', async () => {
        const result = await createTestUser(supabase)
        expect(result).toBe(true)
    })

    it('should sign in test user successfully', async () => {
        await createTestUser(supabase)
        const result = await signInTestUser(supabase)
        expect(result).toBe(true)
    })

    it('should have valid session after sign in', async () => {
        await createTestUser(supabase)
        await signInTestUser(supabase)

        const { isValid, user } = await getTestUserSession(supabase)

        expect(isValid).toBe(true)
        expect(user).toBeTruthy()
        expect(user.email).toBe(testUser.email)
    })

    it('should sign out test user successfully and session should be invalid', async () => {
        await createTestUser(supabase)
        await signInTestUser(supabase)
        const result = await signOutTestUser(supabase)
        expect(result).toBe(true)

        const { isValid } = await getTestUserSession(supabase)
        expect(isValid).toBe(false)
        const { user } = await getTestUser(supabase)
        expect(user).toBeNull()
    })
})
