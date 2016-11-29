import React from 'react';
import { Common } from 'components';

import {injectIntl} from 'react-intl';
import { prepareMessages } from 'locale/helper';

const messages = prepareMessages({
    "Channel.following": "FOLLOWING",
    "Channel.followers": "FOLLOWERS"
})

const Followship = ({followers, following, intl: {
                formatMessage
            }}) => (
    <div className="followship">
        <div className="ui grid">
            <div className="eight wide column">
                <div className="title">{formatMessage(messages.following)}</div>
                <div className="value">
                    <Common.Odometered value={following}/>
                </div>
            </div>
            <div className="eight wide column">
                <div className="title">{formatMessage(messages.followers)}</div>
                <div className="value">
                    <Common.Odometered value={followers}/>
                </div>
            </div>
        </div>
    </div>
)

export default injectIntl(Followship);