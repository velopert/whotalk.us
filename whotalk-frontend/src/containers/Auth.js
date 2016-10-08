import React, {Component} from 'react';
import {Match} from 'react-router';

import {Header, Login, Register, Additional, AdditionalO, OAuthFailure} from 'components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as auth from 'actions/auth.js';
import * as form from 'actions/form';

let LoginRoute = (props) => {
    return (<Login {...props}/>)
};

LoginRoute = connect(
    state => {
        return {
            form: state.form.login,
            status: {
                logged: state.auth.session.logged,
                submitting: state.auth.submitStatus.login,
                user: state.auth.session.user
            }
        }
    },
    dispatch => {
        return {
            AuthActions: bindActionCreators({
                localLogin: auth.localLogin,
                setSubmitStatus: auth.setSubmitStatus
            }, dispatch),
            FormActions: bindActionCreators(form, dispatch)
        }
    }
)(LoginRoute);

let RegisterRoute = (props) => {
    return (<Register {...props}/>)
}

RegisterRoute = connect(
    state => {
        return { 
            form: state.form.register,
            formError: state.form.error.register,
            status: {
                usernameExists: state.auth.register.status.usernameExists,
                isChecking: state.auth.requests.checkUsername.fetching,
                submitting: state.auth.submitStatus.register
            }
        };
    },
    dispatch => {
        return {
            AuthActions: bindActionCreators({
                checkUsername: auth.checkUsername,
                localRegisterPrior: auth.localRegisterPrior,
                resetRegisterStatus: auth.resetRegisterStatus,
                setSubmitStatus: auth.setSubmitStatus
            }, dispatch),
            FormActions: bindActionCreators(form, dispatch)
        };
    }
)(RegisterRoute);


let AdditionalRoute = (props) => {
    return (<Additional {...props}/>)
}

AdditionalRoute = connect(
    state => ({
        accountInfo: { 
            username: state.auth.register.username,
            password: state.auth.register.password
        },
        form: state.form.additional,
        formError: state.form.error.additional,
        status: {
            checking: state.auth.requests.checkEmail.fetching,
            emailExists: state.auth.register.status.emailExists,
            submitting: state.auth.submitStatus.additional,
            success: state.auth.register.status.success,
            error: state.auth.requests.localRegister.error
        }
    }),
    dispatch => ({
        FormActions: bindActionCreators(form, dispatch),
        AuthActions: bindActionCreators({
            checkEmail: auth.checkEmail,
            setSubmitStatus: auth.setSubmitStatus,
            localRegister: auth.localRegister,
            resetRegisterStatus: auth.resetRegisterStatus,
        }, dispatch)
    })
)(AdditionalRoute);

const AdditionalORoute = () => {
    return (<AdditionalO/>)
}
// connect this component to redux

class Auth extends Component {
    render() {
        const {pathname, checkUsername} = this.props;
        return (
            <div>
                <Header/>
                <Match exactly pattern={pathname} component={LoginRoute}/>
                <Match pattern={`${pathname}/login`} component={LoginRoute}/>
                <Match exactly pattern={`${pathname}/register`} component={RegisterRoute}/>
                <Match pattern={`${pathname}/register/additional`} component={AdditionalRoute}/>
                <Match
                    pattern={`${pathname}/register/additional-o`}
                    component={AdditionalORoute}/>
                <Match pattern={`${pathname}/oauth-failure`} component={OAuthFailure}/>
            </div>
        );
    }
}


export default Auth;