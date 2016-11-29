import React from 'react';


import {injectIntl} from 'react-intl';
import { prepareMessages } from 'locale/helper';

const messages = prepareMessages({
    "Chat.startTalking": "START TALKING"
})

const Start = ({onClick, disabled, intl: {
                formatMessage
            }}) => {
    return (
        <div className="start">
            <button className={`ui pink button ${disabled?'loading':''}`} disabled={disabled} onClick={onClick}>{formatMessage(messages.startTalking)}</button>
        </div>
    );
};

export default injectIntl(Start);