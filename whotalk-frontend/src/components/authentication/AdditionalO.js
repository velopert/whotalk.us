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

        if(!this.props.session.user) {
            // INVALID REQUEST
            this.leaveTo('/auth');
            toastr.error('Oops, your social ID is invalid');
            return;            
        }

        if(this.props.session.logged) {
            // already has a username
            this.leaveTo('/');
            toastr.warning('You already have signed in');
            toastr.success(`Hello, ${this.props.session.user.common_profile.givenName}!`);
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

        AuthActions.setSubmitStatus({name: 'register', value: true});


        AuthActions.setSubmitStatus({name: 'register', value: false});

        
    }
    

    render() {
        const redirect = (<Redirect
            to={{
            pathname: this.state.path,
            state: {
                from: this.props.location
            }
        }}/>);

        const { handleChange, leaveTo } = this;
        const { form } = this.props;

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
                        onChange={handleChange}
                        onCancel={()=>leaveTo('/auth')}
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