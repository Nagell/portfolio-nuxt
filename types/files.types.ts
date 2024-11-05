export interface UploadFileQuery {
    name: string
    file: Blob
}

export interface GetFileQuery {
    path: string
}

export interface DeleteFileQuery {
    path: string
}
