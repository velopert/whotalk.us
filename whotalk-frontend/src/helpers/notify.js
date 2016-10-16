import stringHash from 'string-hash';

import alertifyjs from 'alertifyjs';

let duplicates = {};

const notify = ({
    type = 'message',
    message = 'Hello',
    wait = 5,
    preventDuplicates = true
}) => {
    let hash = stringHash(message);
    if(preventDuplicates) {
        if(duplicates[hash]) return;
        duplicates[hash] = true;
    }
    alertifyjs.notify(
        message, 
        type, 
        wait,
        preventDuplicates ? (() => { delete duplicates[hash]; }) : undefined
    );
};

notify.clear = () => {
    alertifyjs.dismissAll();
}

alertifyjs.set('notifier','position', 'top-right');

export default notify;