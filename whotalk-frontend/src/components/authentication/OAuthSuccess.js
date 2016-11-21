import React, {Component} from 'react';
import {Redirect} from 'react-router';
import autobind from 'autobind-decorator';
import { storage } from 'helpers';
import notify from 'helpers/notify';
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
            // toastr.error('Oops, your social ID is invalid');
            notify({type: 'error', message: 'Oops, your social ID is invalid!'});
            return;
        }

        if (this.props.status.session.logged) {
            notify({type: 'success', message: `Hello, ${this.props.status.session.user.common_profile.givenName}!`})
            storage.set('session', this.props.status.session);

            // get redirect
            const redirect = storage.get('redirect');
            if(redirect) {
                 // redirect and clear it
                 this.context.router.transitionTo(redirect.prevPath);
                 storage.remove('redirect');
                  return;
            }
            
            this.leave();

        }
    }

    render() {
        const redirect = (<Redirect
            to={{
            pathname: '/'
        }}/>);
        
        return (
            <div>
                {this.state.leave ? redirect : ''}
            </div>
        )
    }
}

OAuthSuccess.contextTypes = {
    router: React.PropTypes.object
};


export default OAuthSuccess;