import * as assets from './constants/assets'
import * as links from './constants/links'
import * as seo from './constants/seo'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            const: {
                assets,
                links,
                seo
            }
        }
    }
})
