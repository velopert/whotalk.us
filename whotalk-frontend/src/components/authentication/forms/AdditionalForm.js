import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class AdditionalForm extends Component {
    render() {
        const {handleSubmit, reset, submitting, onCancel} = this.props;

        return (
            <form className="ui massive form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>NAME</label>
                    <div className="two fields">
                        <div className="field">
                            <Field
                                name="first_name"
                                component="input"
                                type="text"
                                placeholder="First name"/>
                        </div>
                        <div className="field last-name">
                            <Field name="last_name" component="input" type="text" placeholder="Last name"/>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label>EMAIL</label>
                    <div className="ui left icon input">
                        <Field name="email" component="input" type="email" placeholder="Email"/>
                        <i className="mail icon"></i>
                    </div>
                </div>
                <div className="field">
                    <label>GENDER</label>
                    <Field name="gender" component="select">
                        <option disabled value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Field>
                </div>
                <div className="ui grid">
                    <div className="six wide column">
                        <a className="massive ui button" onClick={onCancel}>
                            CANCEL
                        </a>
                    </div>
                    <div className="ten wide column">
                        <button className="massive pink ui button" type="submit">
                            SIGN UP
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

AdditionalForm = reduxForm({form: 'reg_additional'})(AdditionalForm);

export default AdditionalForm;