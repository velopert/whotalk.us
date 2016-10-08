import React, {Component} from 'react';

const LoginForm = ({form, onChange, onSubmit}) => (
    <div className="ui massive form">
        <div className="field">
            <label>USERNAME</label>
            <div className="ui left icon input">
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={onChange}
                />
                <i className="user icon"></i>
            </div>
        </div>
        <div className="field">
            <label>PASSWORD</label>
            <div className="ui left icon input">
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={onChange}
                />
                <i className="lock icon"></i>
            </div>
        </div>
        <button className="massive pink ui button" type="submit" onClick={onSubmit}>
            LOG IN
        </button>
    </div>
)

export default LoginForm;