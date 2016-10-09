const storage = {};

storage.set = (key, object) => {
    localStorage[key] = JSON.stringify(object);
}

storage.get = (key) => {
    return JSON.parse(localStorage[key]);
}

export default storage;
