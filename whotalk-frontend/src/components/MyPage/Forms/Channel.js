import React from 'react';

import { prepareMessages } from 'locale/helper';
import {injectIntl, defineMessages} from 'react-intl';

const messages = prepareMessages({
    "MyPage.Forms.save": "Save",

    "MyPage.Forms.Channel.title": "Channel",
    "MyPage.Forms.Channel.description": "Change your channel settings",
    "MyPage.Forms.Channel.statusMessage": "Status Message",
    "MyPage.Forms.Channel.clearChattingLog": "Clear Chatting Log",
    "MyPage.Forms.Channel.clear": "Clear",
    "MyPage.Forms.Channel.Confirm.really": "REALLY?",

    "MyPage.yes": "YES",
    "MyPage.no": "NO"
});

let Confirm = ({visible, onHide, onClear, intl: { formatMessage }}) => {
    if(!visible) return null;

    return (
        <div className="confirm-clear fadeIn3">
            <div className="text">{formatMessage(messages.really)}</div>
            <button className="ui red button" onClick={()=> {
                onHide();
                onClear();
            }}>{formatMessage(messages.yes)}</button>
            <button className="ui button" onClick={onHide}>{formatMessage(messages.no)}</button>
        </div>
    );
}

Confirm = injectIntl(Confirm);

const Channel = ({onChange, onClear, onUpdate, statusMessage, loading, updating, confirmVisible, onSetConfirmClearVisibility, clearing, intl: { formatMessage }}) => {
    return (
        <div>
            <div className="top-bar">
                <p className="title">{formatMessage(messages.title)}</p>
                <p>{formatMessage(messages.description)}</p>
            </div>
            <div className={`body ${loading?'opacify':''}`}>
                <div className="ui form huge">
                    <div className="field">
                        <label>
                            {formatMessage(messages.statusMessage)}
                        </label>
                        <input
                            name="statusMessage"
                            placeholder={formatMessage(messages.statusMessage)}
                            onChange={onChange}
                            value={statusMessage}
                        />
                    </div>
                    <div className="field">
                        <label>
                            {formatMessage(messages.clearChattingLog)}
                        </label>
                        <button className={`clear ui red huge button ${clearing?'loading':''}`} onClick={() => {
                            onSetConfirmClearVisibility(true)
                        }}>
                            {formatMessage(messages.clear)}
                        </button>
                    <Confirm 
                        visible={confirmVisible} 
                        onClear={onClear}
                        onHide={()=>onSetConfirmClearVisibility(false)}
                    />
                    </div>
                </div>

                <div className="btn-container">
                    <button
                        className={`ui pink huge button ${updating?'loading':''}`}
                        onClick={onUpdate}
                    >
                        {formatMessage(messages.save)}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default injectIntl(Channel);