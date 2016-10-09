import React, {Component} from 'react';
import {Redirect} from 'react-router';
import autobind from 'autobind-decorator';

const toastr = window.toastr;

class OAuthSuccess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leave: false
        };
    }

    componentDidMount() {
        this.checkSession();
    }

    @autobind
    leave() {
        this.setState({
            leave: true
        })
    }

    @autobind
    async checkSession() {
        await this
            .props
            .AuthActions
            .checkSession();

        if (!this.props.status.session.user) {
            // INVALID REQUEST
            this.leave();
            toastr.error('Oops, your social ID is invalid');
            return;
        }

        if (this.props.status.session.logged) {
            // already has a username
            this.leave();
            toastr.success(`Hello, ${this.props.status.session.user.common_profile.givenName}!`);
            return;
        }
    }

    render() {
        const redirect = (<Redirect
            to={{
            pathname: '/',
            state: {
                from: this.props.location
            }
        }}/>);
        
        return (
            <div>
                {this.state.leave ? redirect : ''}
            </div>
        )
    }
}

export default OAuthSuccess;