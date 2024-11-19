import type { Tables, TablesInsert, TablesUpdate } from './database.types'

export type Project = Tables<'projects'>

export type PostProjectQuery = TablesInsert<'projects'>

export type PatchProjectQuery = TablesUpdate<'projects'> & { id: number }

export type DeleteProjectQuery = { id: number }
