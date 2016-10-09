import React, {Component} from 'react';

const AdditionalOForm = ({form, status, onChange, onSubmit, onCancel}) => (
    <div className="ui massive form">
        <div className="field">
            <label>USERNAME</label>
            <div className="ui left icon input">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={onChange}/>
                <i className="user icon"></i>
            </div>
        </div>
        <div className="ui grid">
            <div className="six wide column">
                <a className="massive ui button" onClick={onCancel}>
                    CANCEL
                </a>
            </div>
            <div className="ten wide column">
                <button
                    className={`massive pink ui button ${status.submitting ? 'loading' : ''}`}
                    type="submit"
                    onClick={onSubmit}
                    disabled={status.submitting}>
                    SIGN UP
                </button>
            </div>
        </div>
    </div>
)

export default AdditionalOForm;