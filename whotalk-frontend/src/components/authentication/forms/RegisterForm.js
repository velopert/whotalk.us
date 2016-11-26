import React from 'react';
import {injectIntl, defineMessages} from 'react-intl';

    // "Register.signUpWith": "SIGN UP WITH",
    // "Register.signUpWithUsername": "SIGN UP WITH YOUR USERNAME",
    // "Register.usernameCapitalized": "USERNAME",
    // "Register.username": "Username",
    // "Register.passwordCapitalized": "PASSWORD",
    // "Register.password": "Password",
    // "Register.already": "Already have an account?",
    // "Register.logIn": "Login",
    // "Register.next": "Next"
    
const messages = defineMessages({
    
    usernameCapitalized: {
        id: "Register.usernameCapitalized",
        defaultMessage: "USERNAME"
    },
    username: {
        id: "Register.username",
        defaultMessage: "Username"
    },
    passwordCapitalized: {
        id: "Register.passwordCapitalized",
        defaultMessage: "PASSWORD"
    },
    password: {
        id: "Register.password",
        defaultMessage: "Password"
    },
    next: {
        id: "Register.next",
        defaultMessage: "NEXT"
    }
})

const RegisterForm = ({
    username,
    password,
    status,
    onChange,
    onBlur,
    onSubmit,
    onKeyPress,
    error,
    intl: {
        formatMessage
    }
}) => (
    <div className="ui massive form">
        <div className={`field ${status.usernameExists || error.username ? 'error' : ''}`}>
            <label>{formatMessage(messages.usernameCapitalized)}</label>
            <div className={`ui left icon input ${status.isChecking ? 'loading' : ''}`}>
                <input
                    name="username"
                    placeholder={formatMessage(messages.username)}
                    type="text"
                    value={username}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={status.submitting}/>
                <i className="icon user"></i>
            </div>
        </div>
        <div className={`field ${error.password ? 'error' : ''}`}>
            <label>{formatMessage(messages.passwordCapitalized)}</label>
            <div className="ui left icon input">
                <input
                    name="password"
                    placeholder={formatMessage(messages.password)}
                    type="password"
                    value={password}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    disabled={status.submitting}/>
                <i className="icon lock"></i>
            </div>
        </div>
        <div className="button-container">
            <button className={`massive pink ui button ${status.submitting ? 'loading' : ''}`} onClick={onSubmit} disabled={status.submitting}>
                {formatMessage(messages.next)}
            </button>
        </div>
    </div>
);

export default injectIntl(RegisterForm);
