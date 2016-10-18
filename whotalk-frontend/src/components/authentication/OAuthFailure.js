import React, { Component } from 'react';
import { Redirect } from 'react-router';
import notify from 'helpers/notify';


class OAuthFailure extends Component {
    componentDidMount() {
        //toastr.error('OAuth Failed, Did you <i>decline</i> the OAuth request?');
        notify({type: 'error', message: 'OAuth failed, please try again.'});
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

export default OAuthFailure;