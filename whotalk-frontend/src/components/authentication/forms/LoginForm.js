import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class LoginForm extends Component {
    render() {
        const { handleSubmit, reset, submitting } = this.props

        return (
            <form className="ui massive form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>USERNAME</label>
                    <div className="ui left icon input">
                        <Field name="username" component="input" type="text" placeholder="Username"/>
                        <i className="user icon"></i>
                    </div>
                </div>
                <div className="field">
                    <label>PASSWORD</label>
                    <div className="ui left icon input">
                         <Field name="password" component="input" type="password" placeholder="Password"/>
                        <i className="lock icon"></i>
                    </div>
                </div>
                <button className="massive pink ui button" type="submit" disabled={ submitting}>
                    LOG IN
                </button>
            </form>
        )
    }
}

LoginForm = reduxForm({form: 'login'})(LoginForm);

export default LoginForm;