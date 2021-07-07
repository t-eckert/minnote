const storage = window.localStorage;

export const save = (key: string, value: string) => {
    storage.setItem(key, value)
}

export const load = (key: string): string | null => {
    return storage.getItem(key)
}