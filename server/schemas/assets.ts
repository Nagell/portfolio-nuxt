import { z } from 'zod'

export const assetQuerySchema = z.object({
    name: z.string(),
})
