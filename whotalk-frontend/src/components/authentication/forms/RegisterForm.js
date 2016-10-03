import React from 'react';

const RegisterForm = ({username, password, status, onChange, onBlur, onSubmit, onKeyPress, error}) => (
    <div className="ui massive form">
        <div className="field">
            <label>USERNAME</label>
            <div className="ui left icon input">
                <input
                    className={status.usernameExists || error.username
                    ? 'error'
                    : ''}
                    name="username"
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={onChange}
                    onBlur={onBlur}/>
                <i className="icon user"></i>
            </div>
        </div>
        <div className="field">
            <label>PASSWORD</label>
            <div className="ui left icon input">
                <input
                    className={error.password ? 'error' : ''}
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={onChange}
                    onKeyPress={onKeyPress}/>
                <i className="icon lock"></i>
            </div>
        </div>
        <div className="button-container">
            <button className="massive pink ui button" onClick={onSubmit}>
                NEXT
            </button>
        </div>
    </div>
);

export default RegisterForm;
