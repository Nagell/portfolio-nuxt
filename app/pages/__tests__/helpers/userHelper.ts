import { createClient } from '@supabase/supabase-js'

import type { NuxtPage } from '@nuxt/test-utils'
import type { SupabaseClient } from '@supabase/supabase-js'

// Singleton pattern to ensure only one test client instance
let testSupabaseClient: SupabaseClient | null = null

/**
 * Creates a Supabase client for testing
 * @returns SupabaseClient - Configured Supabase client
 */
export function createTestSupabaseClient(): SupabaseClient {
    if (testSupabaseClient) {
        return testSupabaseClient
    }

    const supabaseUrl = process.env.SUPABASE_URL || 'http://127.0.0.1:54321'
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY || ''

    if (!supabaseKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY, SUPABASE_KEY or SUPABASE_ANON_KEY environment variable is required')
    }

    testSupabaseClient = createClient(supabaseUrl, supabaseKey, {
        auth: {
            storageKey: 'supabase-test-client',
            detectSessionInUrl: false,
            persistSession: false
        }
    })

    return testSupabaseClient
}

export interface TestUser {
    id: string
    email: string
    password: string
    name: string
}

export const testUser: TestUser = {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    email: 'admin@test.local',
    password: 'testpassword123',
    name: 'Test Admin User'
}

/**
 * Creates a test user in the local Supabase instance using the service role key
 * or direct database access (local development).
 * This bypasses the normal signup process since we're using OAuth in production
 * @param supabase - Supabase client instance
 * @returns Promise<boolean> - Success status
 */
export async function createTestUser(supabase: SupabaseClient): Promise<boolean> {
    try {
        // First, try to create with auth.admin (requires service role)
        const { error } = await supabase.auth.admin.createUser({
            email: testUser.email,
            password: testUser.password,
            email_confirm: true,
            user_metadata: {
                name: testUser.name,
            }
        })

        if (error) {
            // Fallback to regular signup
            const { error: signUpError } = await supabase.auth.signUp({
                email: testUser.email,
                password: testUser.password,
            })

            if (signUpError && !signUpError.message.includes('User already registered')) {
                console.error('Error creating test user:', signUpError.message)
                return false
            }
        }

        return true
    }
    catch (error) {
        console.error('Error creating test user:', error)
        return false
    }
}

/**
 * Signs in the test user using email/password
 * @param supabase - Supabase client instance
 * @returns Promise<boolean> - Success status
 */
export async function signInTestUser(supabase: SupabaseClient): Promise<boolean> {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: testUser.email,
            password: testUser.password,
        })

        if (error) {
            console.error('Error signing in test user:', error)
            return false
        }

        return !!data.user
    }
    catch (error) {
        console.error('Error signing in test user:', error)
        return false
    }
}

/**
 * Signs out the current user
 * @param supabase - Supabase client instance
 * @returns Promise<boolean> - Success status
 */
export async function signOutTestUser(supabase: SupabaseClient): Promise<boolean> {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error signing out test user:', error)
            return false
        }
        return true
    }
    catch (error) {
        console.error('Error signing out test user:', error)
        return false
    }
}

/**
 * Gets the current session from Supabase
 * @param supabase - Supabase client instance
 * @returns Promise<{ isValid: boolean, user: any | null }> - Session validity and user data
 */
export async function getTestUserSession(supabase: SupabaseClient): Promise<{ isValid: boolean, user: any | null }> {
    try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
            console.error('Error getting session:', error)
            return { isValid: false, user: null }
        }

        return {
            isValid: !!session,
            user: session?.user || null
        }
    }
    catch (error) {
        console.error('Error getting session:', error)
        return { isValid: false, user: null }
    }
}

/**
 * Gets the current user from Supabase
 * @param supabase - Supabase client instance
 * @returns Promise<{ isValid: boolean, user: any | null }> - User validity and data
 */
export async function getTestUser(supabase: SupabaseClient): Promise<{ isValid: boolean, user: any | null }> {
    try {
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error) {
            console.error('Error getting user:', error)
            return { isValid: false, user: null }
        }

        return {
            isValid: !!user,
            user: user || null
        }
    }
    catch (error) {
        console.error('Error getting user:', error)
        return { isValid: false, user: null }
    }
}

/**
 * Manually creates a session for testing by using the browser's Supabase client
 * This simulates what happens after successful OAuth
 * @param page - Playwright page instance
 * @returns Promise<boolean> - Success status
 */
export async function createTestBrowserSession(page: NuxtPage): Promise<boolean> {
    try {
        // Create a session server-side first
        const supabase = createTestSupabaseClient()
        await createTestUser(supabase)

        const { data, error } = await supabase.auth.signInWithPassword({
            email: testUser.email,
            password: testUser.password,
        })

        if (error || !data.session) {
            console.error('Failed to create server-side session:', error)
            return false
        }

        // Set cookies in the exact format that @nuxtjs/supabase uses
        const sessionJson = JSON.stringify(data.session)
        const base64Session = Buffer.from(sessionJson).toString('base64')

        // Split the base64 string into chunks
        const chunkSize = 4000 // Approximate chunk size
        const chunks = []
        for (let i = 0; i < base64Session.length; i += chunkSize) {
            chunks.push(base64Session.slice(i, i + chunkSize))
        }

        // Set the cookies
        const cookiesToSet = [
            {
                name: 'sb-127-auth-token.0',
                value: `base64-${chunks[0]}`,
                domain: 'localhost',
                path: '/',
                httpOnly: false
            }
        ]

        // Add second chunk if it exists
        if (chunks[1]) {
            cookiesToSet.push({
                name: 'sb-127-auth-token.1',
                value: chunks[1],
                domain: 'localhost',
                path: '/',
                httpOnly: false
            })
        }

        await page.context().addCookies(cookiesToSet)

        return true
    }
    catch (error) {
        console.error('Error creating test session:', error)
        return false
    }
}
