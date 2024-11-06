import * as images from './constants/images'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            constants: {
                images
            }
        }
    }
})
