import React, {Component} from 'react';
import {Redirect} from 'react-router';
import autobind from 'autobind-decorator';
import { storage } from 'helpers';
import notify from 'helpers/notify';
import {injectIntl} from 'react-intl';
import { prepareMessages } from 'locale/helper';

const messages = prepareMessages({
    "OAuthSuccess.notify.invalidId": "Oops, your social ID is invalid!",
    "OAuthSuccess.notify.success": "Hello, {name}!"   
});

 
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
        const { intl: {
                formatMessage
            }} = this.props;

        await this
            .props
            .AuthActions
            .checkSession();

        if (!this.props.status.session.user) {
            // INVALID REQUEST
            this.leave();
            // toastr.error('Oops, your social ID is invalid');
            notify({type: 'error', message: formatMessage(messages.invalidId)});
            return;
        }

        if (this.props.status.session.logged) {
            notify({type: 'success', message: formatMessage(messages.success, { name: this.props.status.session.user.common_profile.givenName})})
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


export default injectIntl(OAuthSuccess);