import React, {Component} from 'react';
import {Redirect} from 'react-router';
import { AdditionalOForm } from './forms';

import autobind from 'autobind-decorator';
const toastr = window.toastr;

class AdditionalO extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animate: false,
            leave: false,
            path: '',
            invert: false
        };
    }

    @autobind
    leaveTo(path, invert = false) {
        this.setState({animate: true, path, invert});
        setTimeout(() => this.setState({leave: true}), 700)
    }

    @autobind
    handleRegister(data) {
        console.log(data);
    }

    componentDidMount() {
        this.checkSession();
    }

    @autobind
    async checkSession() {
        await this.props.AuthActions.checkSession();

        if(!this.props.status.session.user) {
            // INVALID REQUEST
            this.leaveTo('/auth');
            toastr.error('Oops, your social ID is invalid');
            return;            
        }

        if(this.props.status.session.logged) {
            // already has a username
            this.leaveTo('/');
            toastr.warning('You already have signed in');
            toastr.success(`Hello, ${this.props.status.session.user.common_profile.givenName}!`);
            return;
        }
    }

    @autobind
    handleChange(e) {
        const {FormActions} = this.props;
        FormActions.changeInput({form: 'additional_o', name: e.target.name, value: e.target.value})
    }

    @autobind
    async handleSubmit() {
        const { form, AuthActions } = this.props;

        const regex = /^[0-9a-z]{4,15}$/;
        
        // check regex
        if(!regex.test(form.username)) {
            toastr.error('<b><i>Username</i></b> should be 4 ~ 14 alphanumeric characters.');
            return;
        }

        AuthActions.setSubmitStatus({name: 'additional_o', value: true});

        // check username
        await AuthActions.checkUsername(form.username);
        
        if(this.props.status.usernameExists) {
            toastr.error('That username is already taken, please try another one.');
            AuthActions.setSubmitStatus({name: 'register', value: false});
            return;
        }

        try {
            await AuthActions.oauthRegister({
                username: form.username
            });
        } catch (e) {
            toastr.error('Oops, server rejected your request (' + e.response.data.message + ')');
            AuthActions.setSubmitStatus({name: 'additional', value: false});
            this.leaveTo('/auth');
            return;
        }


        // do session check one more time
        await this.props.AuthActions.checkSession();

        AuthActions.setSubmitStatus({name: 'additional_o', value: false});
        toastr.success(`Hello, ${this.props.status.session.user.common_profile.givenName}!`)
        this.leaveTo('/');
    }
    

    render() {
        const redirect = (<Redirect
            to={{
            pathname: this.state.path,
            state: {
                from: this.props.location
            }
        }}/>);

        const { handleChange, handleSubmit, leaveTo } = this;
        const { form, status } = this.props;

        return (
            <div className="additional">
                <div
                    className={"box bounceInRight " + (this.state.animate
                    ? 'bounceOutLeft'
                    : '')}>
                    <div className="title">YOU ARE ALMOST THERE!</div>
                    <div className="subtitle">TELL US YOUR USERNAME</div>
                    <AdditionalOForm
                        form={form}
                        status={status}
                        onChange={handleChange}
                        onCancel={()=>leaveTo('/auth')}
                        onSubmit={handleSubmit}
                    />
                </div>

                {this.state.leave
                    ? redirect
                    : undefined}
            </div>
        );
    }
}

export default AdditionalO;