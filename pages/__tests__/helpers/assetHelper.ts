export type TestFileType = 'png' | 'jpg' | 'txt'

export type TestFile = {
    name: string
    mimeType: string
    buffer: Buffer
    extension?: string
}

export function createTestFile(name: string, type: TestFileType = 'png'): TestFile {
    switch (type) {
        case 'png':
            return {
                name,
                buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77AAAAAElFTkSuQmCC', 'base64'),
                mimeType: 'image/png',
                extension: 'png'
            }
        case 'jpg':
            return {
                name,
                buffer: Buffer.from('/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A', 'base64'),
                mimeType: 'image/jpeg',
                extension: 'jpg'
            }
        case 'txt':
            return {
                name,
                buffer: Buffer.from('Test document content'),
                mimeType: 'text/plain',
                extension: 'txt'
            }
    }
}
