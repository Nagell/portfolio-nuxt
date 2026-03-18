import { z } from 'zod'

import { publicExperienceInsertSchema, publicExperienceUpdateSchema } from '~~/types/schemas'

const tagsFromQuery = z.string().or(z.array(z.string())).optional().nullable()
    .transform(val => typeof val === 'string'
        ? val.split(',').map(t => t.trim()).filter(Boolean)
        : (val ?? []))

const endFromQuery = z.string().optional().nullable()
    .transform(val => val || null)

export const experienceInsertSchema = publicExperienceInsertSchema.extend({
    tags: tagsFromQuery,
    end: endFromQuery,
})

export const experienceUpdateSchema = publicExperienceUpdateSchema.extend({
    id: z.coerce.number().int().min(1),
    tags: tagsFromQuery,
    end: endFromQuery,
})

export const experienceDeleteSchema = z.object({
    id: z.coerce.number().int().min(1),
})
