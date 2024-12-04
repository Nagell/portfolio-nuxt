import { PatchProjectQuery, PostProjectQuery } from '~/types/projects.types'

export const sanitizeProjectsQuery = (project: PatchProjectQuery | PostProjectQuery) => {
    if (!project.tags) project.tags = []
    if (typeof project.tags === 'string') project.tags = [ ...project.tags.split(',') ]
    return project
}
