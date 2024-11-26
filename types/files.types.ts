import type { FileObject } from '@supabase/storage-js'

export type Asset = FileObject

export type GetFileQuery = { name: string }

export type DeleteFileQuery = { name: string }
