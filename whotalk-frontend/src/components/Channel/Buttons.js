import React from 'react';

import {injectIntl} from 'react-intl';
import { prepareMessages } from 'locale/helper';

const messages = prepareMessages({
    "Channel.follow": "FOLLOW",
    "Channel.unfollow": "UNFOLLOW",
    "Channel.enter": "ENTER CHANNEL"
})
const Buttons = ({
    followed,
    pending,
    onEnter,
    onFollow,
    onUnfollow,
    disableFollow,
    intl: {
        formatMessage
    }
}) => {
    return (
        <div className="ui grid stackable buttons">
            <div className="ten wide column">
                <button className="ui inverted pink button" onClick={onEnter}>
                    <i className="sign in icon"></i>
                    {formatMessage(messages.enter)}
                </button>
            </div>
            <div className="six wide column">
                <button
                    className={`ui inverted button grey ${pending ? 'loading' : ''}`}
                    disabled={disableFollow || pending}
                    onClick={followed ? onUnfollow : onFollow}>
                    <i
                        className={`${followed ? 'remove' : 'add'} user icon`}></i>
                    {followed ? formatMessage(messages.unfollow) : formatMessage(messages.follow)}
                </button>
            </div>
        </div>
    );
};

export default injectIntl(Buttons);