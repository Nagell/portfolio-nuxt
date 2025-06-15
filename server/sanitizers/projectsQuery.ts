import type { PatchProjectQuery, PostProjectQuery } from '~/types/projects.types'

export const sanitizeProjectsQuery = (project: PatchProjectQuery | PostProjectQuery) => {
    if (!project.tags) project.tags = []
    if (typeof project.tags === 'string') project.tags = [ ...project.tags.split(',') ]
    // fix for local development
    if (project.image?.includes('127.0.0.1')) project.image = project.image.replace('127.0.0.1', 'localhost')

    return project
}
