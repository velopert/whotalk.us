import React from 'react';
import { Common } from 'components';

import {injectIntl} from 'react-intl';
import { prepareMessages } from 'locale/helper';


const messages = prepareMessages({
    "Channel.following": "FOLLOWING",
    "Channel.followers": "FOLLOWERS",
    "Channel.talkers": "TALKERS"
})


const Info = ({channelInfo, onOpen,  intl: {
                formatMessage
            }}) => {
    return (
        <div className="info ui grid">
            <div className="three column row">
                <div className="column">
                    <div className="title">{formatMessage(messages.talkers)}</div>
                    <div className="value"><Common.Odometered value={channelInfo.talkers}/></div>
                </div>
                <div className="column" onClick={() => {onOpen('following')}}>
                    <div className="title">{formatMessage(messages.following)}</div>
                    <div className="value"><Common.Odometered value={channelInfo.following}/></div>
                </div>
                <div className="column" onClick={()=>{onOpen('followers')}}>
                    <div className="title">{formatMessage(messages.followers)}</div>
                    <div className="value"><Common.Odometered value={channelInfo.followers}/></div>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(Info);