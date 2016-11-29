import React from 'react';

import {injectIntl} from 'react-intl';
import { prepareMessages } from 'locale/helper';

const messages = prepareMessages({
    "Chat.selectIdentity": "SELECT YOUR IDENTITY",
    "Chat.anonymous": "anonymous",
    "Chat.pleaseLogin": "please login.."
})


const Select = ({username, closing, onClose, onSelect, intl: {
                formatMessage
            }}) => {
    return (
        <div className={`select fadeIn7 ${closing ? ' fadeOut' : ''}`}>
            <div className="exit" onClick={onClose}>
                <i className="icon remove"/>
            </div>
            <div className="wrapper">
                <div className="title">{formatMessage(messages.selectIdentity)}</div>
                <div className="options">
                    <button className="inverted basic pink ui icon button" onClick={()=>{onSelect('user')}} disabled={username===null}>
                        <i className="icon user"></i>
                        {username === null ? formatMessage(messages.pleaseLogin) : username}
                    </button>

                    <button className="inverted basic pink ui icon button" onClick={()=>{onSelect('anonymous')}}>
                        <i className="icon spy"></i>
                        {formatMessage(messages.anonymous)}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(Select);