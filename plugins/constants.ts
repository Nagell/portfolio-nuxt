import * as assets from './constants/assets'
import * as links from './constants/links'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            const: {
                assets,
                links
            }
        }
    }
})
