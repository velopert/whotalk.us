import React, {Component} from 'react';
import {injectIntl, defineMessages} from 'react-intl';

const messages = defineMessages({
    usernameCapitalized: {
        id: "Login.usernameCapitalized",
        defaultMessage: "USERNAME"
    },
    username: {
        id: "Login.username",
        defaultMessage: "Username"
    },
    passwordCapitalized: {
        id: "Login.passwordCapitalized",
        defaultMessage: "PASSWORD"
    },
    password: {
        id: "Login.password",
        defaultMessage: "Password"
    },
    logIn: {
        id: "Login.logIn",
        defaultMessage: "LOGIN"
    }
})

const LoginForm = ({
    form,
    status,
    onChange,
    onSubmit,
    onKeyPress,
    intl: {
        formatMessage
    }
}) => (
    <div className="ui massive form">
        <div className="field">
            <label>{formatMessage(messages.usernameCapitalized)}</label>
            <div className="ui left icon input">
                <input
                    name="username"
                    type="text"
                    placeholder={formatMessage(messages.username)}
                    value={form.username}
                    onChange={onChange}/>
                <i className="user icon"></i>
            </div>
        </div>
        <div className="field">
            <label>{formatMessage(messages.passwordCapitalized)}</label>
            <div className="ui left icon input">
                <input
                    name="password"
                    type="password"
                    placeholder={formatMessage(messages.password)}
                    value={form.password}
                    onChange={onChange}
                    onKeyPress={onKeyPress}/>
                <i className="lock icon"></i>
            </div>
        </div>
        <button
            className={`massive pink ui button ${status.submitting
            ? 'loading'
            : ''}`}
            type="submit"
            onClick={onSubmit}
            disabled={status.submitting}>
            {formatMessage(messages.logIn)}
        </button>
    </div>
)

export default injectIntl(LoginForm);