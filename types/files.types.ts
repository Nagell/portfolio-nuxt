import type { FileObject } from '@supabase/storage-js'

export type Asset = FileObject

export type GetAssetQuery = { name: string }

export type DeleteAssetQuery = { name: string }
