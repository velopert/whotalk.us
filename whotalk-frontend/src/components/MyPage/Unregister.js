import React from 'react'

import { prepareMessages } from 'locale/helper';
import {injectIntl, defineMessages, FormattedHTMLMessage} from 'react-intl';

const messages = prepareMessages({
    "MyPage.Unregister.question": "Do you <b>really</b> want to unregister?",
    "MyPage.yes": "YES",
    "MyPage.no": "NO"
});


const Unregister = ({visible, onClose, onUnregister, intl: { formatMessage }}) => {

    if(!visible) return null;

    return (
        <div className="unregister-wrapper">
            <div className="unregister animated flipInX">
                <div className="title">
                    <i className="remove user icon big"></i>
                </div>
                <div className="question">
                    <FormattedHTMLMessage id="MyPage.Unregister.question"/>
                </div>
                <div className="button-container">
                    <div className="button" onClick={onUnregister}> {formatMessage(messages.yes)}</div>
                    <div className="button" onClick={onClose}> {formatMessage(messages.no)}</div>
                </div>
            </div>
        </div>
    )
}

export default injectIntl(Unregister);