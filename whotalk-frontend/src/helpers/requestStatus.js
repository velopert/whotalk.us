const request = {
    fetching: false,
    fetched: false,
    error: null
}

const pending = {
    fetching: true,
    fetched: false,
    error: null
};

const fulfilled = {
    fetching: false,
    fetched: true,
    error: null
};

const rejected = {
    fetching: false,
    fetched: false
}

export {
    request,
    pending,
    fulfilled,
    rejected
}