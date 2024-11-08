import * as covers from './constants/projectCovers'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            const: {
                covers
            }
        }
    }
})
