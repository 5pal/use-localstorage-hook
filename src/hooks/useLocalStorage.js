export const useLocalStorage = key => {
    const setItem = value => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const getItem = () => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : undefined;
    };

    const removeItem = () => {
        localStorage.removeItem(key);
    };

    const clearItem = () => {
        localStorage.clear();
    };

    return { setItem, getItem, removeItem, clearItem };
};
