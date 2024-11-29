import type { GetGitHubUserResponse } from '~/types/github.types'

export async function getGitHubAvatar(email: string, size: number = 100) {
    const response: GetGitHubUserResponse = await $fetch(`https://api.github.com/search/users?q=${email}+in%3Aemail`)

    return response?.items[0]?.avatar_url + `&size=${size}`
}
