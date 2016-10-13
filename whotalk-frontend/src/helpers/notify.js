import stringHash from 'string-hash';

import alertifyjs from 'alertifyjs';

const duplicates = {};

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

alertifyjs.set('notifier','position', 'top-right');

export default notify;