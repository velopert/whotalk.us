const storage = {};

storage.set = (key, object) => {
    localStorage[key] = JSON.stringify(object);
}

storage.get = (key) => {
    if(!localStorage[key]) {
        return undefined;
    }
    return JSON.parse(localStorage[key]);
}

storage.remove = (key) => {
    if(localStorage[key]) {
        localStorage.removeItem(key);
    }
}

export default storage;
