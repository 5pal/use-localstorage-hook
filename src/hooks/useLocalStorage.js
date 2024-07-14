export const useLocalStorage = key => {
    const setItem = value => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    const getItem = () => {
        const items = localStorage.getItem(key);
        return items ? JSON.parse(items) : [];
    };

    const removeItem = itemId => {
        const items = localStorage.getItem(key);
        const itemArr = JSON.parse(items);
        const newItemArr = itemArr.filter(item => item.id !== itemId);

        return newItemArr;
    };

    const clearItem = () => {
        localStorage.clear();
    };

    return { setItem, getItem, removeItem, clearItem };
};
