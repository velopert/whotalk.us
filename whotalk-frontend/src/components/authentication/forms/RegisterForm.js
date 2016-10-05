import React from 'react';

const RegisterForm = ({
    username,
    password,
    status,
    onChange,
    onBlur,
    onSubmit,
    onKeyPress,
    error
}) => (
    <div className="ui massive form">
        <div className={`field ${status.usernameExists || error.username ? 'error' : ''}`}>
            <label>USERNAME</label>
            <div className={`ui left icon input ${status.isChecking ? 'loading' : ''}`}>
                <input
                    name="username"
                    placeholder="Username"
                    type="text"
                    value={username}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={status.submitting}/>
                <i className="icon user"></i>
            </div>
        </div>
        <div className={`field ${error.password ? 'error' : ''}`}>
            <label>PASSWORD</label>
            <div className="ui left icon input">
                <input
                    name="password"
                    placeholder="Password"
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
                NEXT
            </button>
        </div>
    </div>
);

export default RegisterForm;
