import * as assets from './constants/assets'
import * as links from './constants/links'
import * as page from './constants/page'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            const: {
                assets,
                links,
                page
            }
        }
    }
})
