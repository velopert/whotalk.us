import React, {Component} from 'react';

const AdditionalForm = ({form, onSelect}) => (
    <form className="ui massive form">
        <div className="field">
            <label>NAME</label>
            <div className="two fields">
                <div className="field">
                    <input name="firstName" type="text" placeholder="First name"/>
                </div>
                <div className="field last-name">
                    <input name="lastName" type="text" placeholder="Last name"/>
                </div>
            </div>
        </div>
        <div className="field">
            <label>EMAIL</label>
            <div className="ui left icon input">
                <input name="email" type="email" placeholder="Email"/>
                <i className="mail icon"></i>
            </div>
        </div>
        <div className="field">
            <label>GENDER</label>
            <div className="ui selection dropdown">
                <input type="hidden" name="gender"/>
                <i className="dropdown icon"></i>
                <div className="default text">Gender</div>
                <div className="menu">
                    <div className="item select-item" data-value="male" data-text="Male" onClick={()=>onSelect('gender', 'male')}>
                        <i className="male icon"></i>
                        Male
                    </div>
                    <div className="item select-item" data-value="female" data-text="Female" onClick={()=>onSelect('gender', 'female')}>
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
                <button className="massive pink ui button" type="submit">
                    SIGN UP
                </button>
            </div>
        </div>
    </form>
);
export default AdditionalForm;