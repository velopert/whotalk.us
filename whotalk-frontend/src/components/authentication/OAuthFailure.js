import React, { Component } from 'react';
import { Redirect } from 'react-router';
const toastr = window.toastr;

class OAuthFailure extends Component {
    componentDidMount() {
        toastr.error('OAuth Failed, Did you <i>decline</i> the OAuth request?');
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