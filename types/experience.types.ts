import type { Tables, TablesInsert, TablesUpdate } from './database.types'

export type Experience = Tables<'experience'>

export type PostExperienceQuery = TablesInsert<'experience'>

export type PatchExperienceQuery = TablesUpdate<'experience'> & { id: number }

export type DeleteExperienceQuery = { id: number }
