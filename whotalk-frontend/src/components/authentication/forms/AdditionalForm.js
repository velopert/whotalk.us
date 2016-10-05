import React, {Component} from 'react';

const AdditionalForm = ({form, status, onSelect, onChange, onSubmit, onBlur, error}) => (
    <div className="ui massive form">
        <div className="field">
            <label>NAME</label>
            <div className="two fields">
                <div className={`field ${error.firstName ? 'error' : ''}`}>
                    <input
                        name="firstName"
                        type="text"
                        placeholder="First name"
                        onChange={onChange}
                        value={form.firstName}/>
                </div>
                <div className={`field ${error.lastName ? 'error' : ''}`}>
                    <input
                        name="lastName"
                        type="text"
                        placeholder="Last name"
                        onChange={onChange}
                        value={form.lastName}/>
                </div>
            </div>
        </div>
        <div className={`field ${error.email ? 'error' : ''}`}>
            <label>EMAIL</label>
            <div className={`ui left icon input ${status.checking ? 'loading' : ''}`}>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    onChange={onChange}
                    value={form.email}
                    onBlur={onBlur}/>
                <i className="mail icon"></i>
            </div>
        </div>
        <div className={`field ${error.gender ? 'error' : ''}`}>
            <label>GENDER</label>
            <div className="ui selection dropdown">
                <input type="hidden" name="gender" value={form.gender}/>
                <i className="dropdown icon"></i>
                <div className="default text">Gender</div>
                <div className="menu">
                    <div
                        className="item select-item"
                        data-value="male"
                        data-text="Male"
                        onClick={() => onSelect('gender', 'male')}>
                        <i className="male icon"></i>
                        Male
                    </div>
                    <div
                        className="item select-item"
                        data-value="female"
                        data-text="Female"
                        onClick={() => onSelect('gender', 'female')}>
                        <i className="female icon"></i>
                        Female
                    </div>
                </div>
            </div>
        </div>
        <div className="ui grid">
            <div className="six wide column">
                <a className="massive ui button">
                    CANCEL
                </a>
            </div>
            <div className="ten wide column">
                <button className={`massive pink ui button ${status.submitting ? 'loading' : ''}`} onClick={onSubmit} disabled={status.submitting}>
                    SIGN UP
                </button>
            </div>
        </div>
    </div>
);
export default AdditionalForm;