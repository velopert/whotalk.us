import React, { Component } from 'react';
import { Redirect } from 'react-router';
import notify from 'helpers/notify';


class OAuthFailure extends Component {
    componentDidMount() {
        //toastr.error('OAuth Failed, Did you <i>decline</i> the OAuth request?');
        notify({type: 'error', message: 'OAuth Failed, Did you decline the OAuth request?'});
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