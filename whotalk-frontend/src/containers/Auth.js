import React, {Component} from 'react';
import {Match} from 'react-router';

import {
    Header,
    Login,
    Register,
    Additional,
    AdditionalO,
    OAuthFailure,
    OAuthSuccess
} from 'components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as auth from 'actions/auth.js';
import * as form from 'actions/form';
import * as ui from 'actions/ui';

import detectMobile from 'helpers/detect-mobile';


let LoginRoute = (props) => {
    return (<Login {...props}/>)
};

LoginRoute = connect(state => {
    return {
        form: state.form.login,
        status: {
            logged: state.auth.session.logged,
            submitting: state.auth.submitStatus.login,
            session: state.auth.session
        }
    }
}, dispatch => {
    return {
        AuthActions: bindActionCreators({
            localLogin: auth.localLogin,
            setSubmitStatus: auth.setSubmitStatus
        }, dispatch),
        FormActions: bindActionCreators(form, dispatch)
    }
})(LoginRoute);

let RegisterRoute = (props) => {
    return (<Register {...props}/>)
}

RegisterRoute = connect(state => {
    return {
        form: state.form.register,
        formError: state.form.error.register,
        status: {
            usernameExists: state.auth.register.status.usernameExists,
            isChecking: state.auth.requests.checkUsername.fetching,
            submitting: state.auth.submitStatus.register
        }
    };
}, dispatch => {
    return {
        AuthActions: bindActionCreators({
            checkUsername: auth.checkUsername,
            localRegisterPrior: auth.localRegisterPrior,
            resetRegisterStatus: auth.resetRegisterStatus,
            setSubmitStatus: auth.setSubmitStatus
        }, dispatch),
        FormActions: bindActionCreators(form, dispatch)
    };
})(RegisterRoute);

let AdditionalRoute = (props) => {
    return (<Additional {...props}/>)
}

AdditionalRoute = connect(state => ({
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
}), dispatch => ({
    FormActions: bindActionCreators(form, dispatch),
    AuthActions: bindActionCreators({
        checkEmail: auth.checkEmail,
        setSubmitStatus: auth.setSubmitStatus,
        localRegister: auth.localRegister,
        resetRegisterStatus: auth.resetRegisterStatus
    }, dispatch)
}))(AdditionalRoute);

let AdditionalORoute = (props) => {
    return (<AdditionalO {...props}/>)
};

AdditionalORoute = connect(state => ({
    form: state.form.additional_o,
    status: {
        submitting: state.auth.submitStatus.additional_o,
        session: state.auth.session,
        usernameExists: state.auth.register.status.usernameExists
    }
}), dispatch => ({
    FormActions: bindActionCreators(form, dispatch),
    AuthActions: bindActionCreators({
        setSubmitStatus: auth.setSubmitStatus,
        checkSession: auth.checkSession,
        checkUsername: auth.checkUsername,
        oauthRegister: auth.oauthRegister
    }, dispatch)
}))(AdditionalORoute);


let OAuthSuccessRoute = (props) => (
    <OAuthSuccess {...props}/>
);

OAuthSuccessRoute = connect(
    state => ({
        status: {
            session: state.auth.session,
            checking: state.auth.requests.checkSession.fetching
        }
    })
    ,dispatch => ({
        AuthActions: bindActionCreators({
            checkSession: auth.checkSession
        }, dispatch)
    })
)(OAuthSuccess);
// connect this component to redux

class Auth extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(ui.setHeaderTransparency(true));
        dispatch(ui.setFooterVisibility(false));
        dispatch(ui.setFooterSpace(false));
    }
    
    render() {
        const {pathname} = this.props;
        return (
            <div>
                <div className="fullscreen-container">
                <Match exactly pattern={pathname} component={LoginRoute} location={this.props.location}/>
                <Match pattern={`${pathname}/login`} component={LoginRoute} location={this.props.location}/>
                <Match exactly pattern={`${pathname}/register`} component={RegisterRoute} location={this.props.location}/>
                <Match pattern={`${pathname}/register/additional`} component={AdditionalRoute} location={this.props.location}/>
                <Match
                    pattern={`${pathname}/register/additional-o`}
                    component={AdditionalORoute}/>
                <Match pattern={`${pathname}/oauth-failure`} component={OAuthFailure} location={this.props.location}/>
                <Match pattern={`${pathname}/oauth-success`} component={OAuthSuccessRoute} location={this.props.location}/>
                </div>
            </div>
        );
    }
}

Auth = connect()(Auth);
export default Auth;