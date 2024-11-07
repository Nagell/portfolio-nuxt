import * as images from './constants/projectCovers'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            constants: {
                images
            }
        }
    }
})
