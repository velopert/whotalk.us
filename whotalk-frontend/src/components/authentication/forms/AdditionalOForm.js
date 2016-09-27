import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class AdditionalOForm extends Component {
    render() {
        const { handleSubmit, reset, submitting, onCancel } = this.props;

        return (
                    <form className="ui massive form" onSubmit={handleSubmit}>
                        <div className="field">
                            <label>USERNAME</label>
                            <div className="ui left icon input">
                                <input type="text" placeholder="Username"/>
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
                                <button className="massive pink ui button">
                                    SIGN UP
                                </button>
                            </div>
                        </div>
                    </form>
        );
    }
}

AdditionalOForm = reduxForm({form: 'reg_additional_o'})(AdditionalOForm);

export default AdditionalOForm;