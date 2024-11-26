import * as assets from './constants/assets'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            const: {
                assets
            }
        }
    }
})
