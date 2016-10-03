import React, {Component} from 'react';

const AdditionalForm = ({form}) => (
    <form className="ui massive form">
        <div className="field">
            <label>NAME</label>
            <div className="two fields">
                <div className="field">
                    <input name="first_name" type="text" placeholder="First name"/>
                </div>
                <div className="field last-name">
                    <input name="last_name" type="text" placeholder="Last name"/>
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
            <select name="gender">
                <option disabled value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
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