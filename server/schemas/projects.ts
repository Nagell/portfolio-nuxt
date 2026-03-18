import { z } from 'zod'

import { publicProjectsInsertSchema, publicProjectsUpdateSchema } from '~~/types/schemas'

const tagsFromQuery = z.string().or(z.array(z.string())).optional().nullable()
    .transform(val => typeof val === 'string'
        ? val.split(',').map(t => t.trim()).filter(Boolean)
        : (val ?? []))

const imageFromQuery = z.string()
    .transform(val => val.replace('127.0.0.1', 'localhost'))

export const projectsInsertSchema = publicProjectsInsertSchema.extend({
    tags: tagsFromQuery,
    image: imageFromQuery,
})

export const projectsUpdateSchema = publicProjectsUpdateSchema.extend({
    id: z.coerce.number().int().min(1),
    tags: tagsFromQuery,
    image: imageFromQuery.optional(),
})

export const projectsDeleteSchema = z.object({
    id: z.coerce.number().int().min(1),
})
