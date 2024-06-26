export const ls = {
    set: (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: (key: string) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },
    clear: () => {
        localStorage.clear();
    }
};

export const ss = {
    set: (key: string, value: any) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    get: (key: string) => {
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },
    clear: () => {
        sessionStorage.clear();
    }
};
