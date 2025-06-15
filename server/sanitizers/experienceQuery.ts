import type { PatchExperienceQuery, PostExperienceQuery } from '~/types/experience.types'

export const sanitizeExperienceQuery = (experience: PatchExperienceQuery | PostExperienceQuery) => {
    if (!experience.end) experience.end = null
    if (!experience.tags) experience.tags = []
    if (typeof experience.tags === 'string') experience.tags = [ ...experience.tags.split(',') ]
    return experience
}
