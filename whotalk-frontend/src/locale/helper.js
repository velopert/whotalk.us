import { defineMessages } from 'react-intl';


export const prepareMessages = (localeObject) => {
    const keys = Object.keys(localeObject);
    const descriptors = {};
    for(let i = 0 ; i < keys.length; i++) {
        const tokens = keys[i].split('.');
        const token = tokens[tokens.length-1];
        descriptors[token] = {
            id: keys[i],
            defaultMessage: localeObject[keys[i]]
        }
    }
    return defineMessages(descriptors)
}
