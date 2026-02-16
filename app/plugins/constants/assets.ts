export const ASSETS_BUCKET = 'assets'
export const MAX_FILE_SIZE = 1024 * 1024 * 5 // 5MB
export const ACCEPTED_FILE_TYPES = [ '.jpeg', '.jpg', '.png', '.webp', '.pdf' ]
export const ACCEPTED_MIME_TYPES = [ 'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf' ]
export const CV_FILE_NAME = import.meta.env.VITE_CV_FILE_NAME as string
