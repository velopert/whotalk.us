import React from 'react'

const Box = () => {
    return (
         <div className="twelve wide column box-wrapper">
            <div className="box">
                <div className="top-bar">
                    <p><b>Account</b></p>
                    <p>Change your basic account settings</p>
                </div>
                <div className="body">
                    <form className="ui form massive">
                    <div className="field">
                        <label>First Name</label>
                        <input type="text" name="first-name" placeholder="First Name"/>
                    </div>
                    <div className="field">
                        <label>Last Name</label>
                        <input type="text" name="last-name" placeholder="Last Name"/>
                    </div>
                    <div className="field">
                        <div className="ui checkbox">
                        <input type="checkbox" tabindex="0" className="hidden"/>
                        <label>I agree to the Terms and Conditions</label>
                        </div>
                    </div>
                    <button className="ui button" type="submit">Submit</button>
                    </form>
                </div>
            </div>
         </div>
    );
};

export default Box;