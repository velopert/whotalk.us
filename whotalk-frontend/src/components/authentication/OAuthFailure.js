import React, { Component } from 'react';
import { Redirect } from 'react-router';
import notify from 'helpers/notify';
import {injectIntl} from 'react-intl';
import { prepareMessages } from 'locale/helper';

const messages = prepareMessages({
    "OAuthFailure.notify.failure": "OAuth failed, please try again"
})

class OAuthFailure extends Component {
    componentDidMount() {
       const { intl: {
                formatMessage
            }} = this.props;

        //toastr.error('OAuth Failed, Did you <i>decline</i> the OAuth request?');
        notify({type: 'error', message: formatMessage(messages.failure)});
    }
    
    render() {
        return(
            <Redirect
                to={{
                pathname: '/auth',
                state: {
                    from: this.props.location
                }
            }}/>
        )
    }
}

export default injectIntl(OAuthFailure);