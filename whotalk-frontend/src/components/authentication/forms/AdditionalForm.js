import React, {Component} from 'react';
import {injectIntl, defineMessages} from 'react-intl';



const messages = defineMessages({
    name: {
        id: "Additional.name",
        defaultMessage: "NAME"
    },
    firstName: {
        id: "Additional.firstName",
        defaultMessage: "First Name"
    },
    lastName: {
        id: "Additional.lastName",
        defaultMessage: "LAST NAME"
    },
    emailCapitalized: {
        id: "Additional.emailCapitalized",
        defaultMessage: "EMAIL"
    },
    email: {
        id: "Additional.email",
        defaultMessage: "Email"
    },
    genderCapitalized: {
        id: "Additional.genderCapitalized",
        defaultMessage: "GENDER"
    },
    gender: {
        id: "Additional.gender",
        defaultMessage: "Gender"
    },
    male: {
        id: "Additional.male",
        defaultMessage: "Male"
    },
    female: {
        id: "Additional.female",
        defaultMessage: "Female"
    },
    cancel: {
        id: "Additional.cancel",
        defaultMessage: "Cancel"
    },
    signUp: {
        id: "Additional.signUp",
        defaultMessage: "SIGN UP"
    },
})


const AdditionalForm = ({
    form,
    status,
    onSelect,
    onChange,
    onSubmit,
    onBlur,
    onCancel,
    error,
    intl: {
        locale,
        formatMessage
    }
}) => {

    const firstName = (
        <div
            className={`field ${error.firstName
            ? 'error'
            : ''}`}>
            <input
                name="firstName"
                type="text"
                placeholder={formatMessage(messages.firstName)}
                onChange={onChange}
                value={form.firstName}/>
        </div>
    )

    const lastName = (
        <div
            className={`field ${error.lastName
            ? 'error'
            : ''}`}>
            <input
                name="lastName"
                type="text"
                placeholder={formatMessage(messages.lastName)}
                onChange={onChange}
                value={form.lastName}/>
        </div>
    )


    return (
        <div className="ui massive form">
            <div className="field">
                <label>{formatMessage(messages.name)}</label>
                <div className="two fields">
                     {locale=== 'ko' ? lastName : firstName}
                     {locale=== 'ko' ? firstName : lastName}
                </div>
            </div>
            <div className={`field ${error.email
                ? 'error'
                : ''}`}>
                <label>{formatMessage(messages.emailCapitalized)}</label>
                <div
                    className={`ui left icon input ${status.checking
                    ? 'loading'
                    : ''}`}>
                    <input
                        name="email"
                        type="text"
                        placeholder={formatMessage(messages.email)}
                        onChange={onChange}
                        value={form.email}
                        onBlur={onBlur}/>
                    <i className="mail icon"></i>
                </div>
            </div>
            <div className={`field ${error.gender
                ? 'error'
                : ''}`}>
                <label>{formatMessage(messages.genderCapitalized)}</label>
                <div className="ui selection dropdown">
                    <input type="hidden" name="gender" value={form.gender}/>
                    <i className="dropdown icon"></i>
                    <div className="default text">{formatMessage(messages.gender)}</div>
                    <div className="menu">
                        <div
                            className="item select-item"
                            data-value="male"
                            data-text={formatMessage(messages.male)}
                            onClick={() => onSelect('gender', 'male')}>
                            <i className="male icon"></i>
                            {formatMessage(messages.male)}
                        </div>
                        <div
                            className="item select-item"
                            data-value="female"
                            data-text={formatMessage(messages.female)}
                            onClick={() => onSelect('gender', 'female')}>
                            <i className="female icon"></i>
                            {formatMessage(messages.female)}
                        </div>
                    </div>
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
                        onClick={onSubmit}
                        disabled={status.submitting}>
                        {formatMessage(messages.signUp)}
                    </button>
                </div>
            </div>
        </div>
    )
};

export default injectIntl(AdditionalForm);