import React from 'react'

const Account = () => {
    return (
        <div>
            <div className="top-bar">
                <p className="title">Account</p>
                <p>Change your basic account settings</p>
            </div>
            <div className="body">
                <div className="ui form huge">
                    <div className="field">
                        <label className="disabled">USERNAME <i className="ban icon"></i></label>
                        <input disabled type="text" name="username" placeholder="Username"/>
                    </div>

                    <div className="field">
                        <label className>PASSWORD</label>
                        <input disabled type="password" name="password" value="password"/>
                    </div>



                    <div className="field">
                        <label>EMAIL</label>
                        <input type="text" name="email" placeholder="Email"/>
                    </div>


                    <div className="field">
                        <label>NAME</label>
                        <div className="two fields">
                        <div className="field">
                            <input type="text" name="shipping[first-name]" placeholder="First Name"/>
                        </div>
                        <div className="field">
                            <input type="text" name="shipping[last-name]" placeholder="Last Name"/>
                        </div>
                        </div>
                    </div>
                    <div className="btn-container">
                        <button className="ui pink huge button">Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account