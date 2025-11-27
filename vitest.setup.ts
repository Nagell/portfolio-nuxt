// Mock localStorage for Node v25 compatibility with happy-dom
const storage = new Map<string, string>()

const mockStorage: Storage = {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, value: string) => storage.set(key, value),
    removeItem: (key: string) => storage.delete(key),
    clear: () => storage.clear(),
    key: (index: number) => Array.from(storage.keys())[index] ?? null,
    get length() {
        return storage.size
    }
}

// Force override localStorage regardless of existing implementation
Object.defineProperty(global, 'localStorage', {
    value: mockStorage,
    writable: true,
    configurable: true
})
