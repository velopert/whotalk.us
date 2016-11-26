import React, {Component} from 'react';
import {injectIntl, defineMessages} from 'react-intl';

const messages = defineMessages({
    usernameCapitalized: {
        id: "AdditionalO.usernameCapitalized",
        defaultMessage: "USERNAME"
    },
    username: {
        id: "AdditionalO.username",
        defaultMessage: "Username"
    },
    cancel: {
        id: "AdditionalO.cancel",
        defaultMessage: "CANCEL"
    },
    signUp: {
        id: "AdditionalO.signUp",
        defaultMessage: "SIGNUP"
    }
})

const AdditionalOForm = ({
    form,
    status,
    onChange,
    onSubmit,
    onCancel,
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
                    type="text"
                    name="username"
                    placeholder={formatMessage(messages.username)}
                    value={form.username}
                    onChange={onChange}
                    onKeyPress={onKeyPress}/>
                <i className="user icon"></i>
            </div>
        </div>
        <div className="ui grid">
            <div className="six wide column">
                <a className="massive ui button" onClick={onCancel}>
                    {formatMessage(messages.cancel)}
                </a>
            </div>
            <div className="ten wide column">
                <button
                    className={`massive pink ui button ${status.submitting
                    ? 'loading'
                    : ''}`}
                    type="submit"
                    onClick={onSubmit}
                    disabled={status.submitting}>
                    {formatMessage(messages.signUp)}
                </button>
            </div>
        </div>
    </div>
)

export default injectIntl(AdditionalOForm);