export interface UploadFileQuery {
    name: string
    file: Blob
}

export interface GetFileQuery {
    name: string
}

export interface DeleteFileQuery {
    name: string
}
