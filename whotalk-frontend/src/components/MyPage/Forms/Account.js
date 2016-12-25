import React from 'react'

const Account = ({
    type,
    username, 
    email, 
    givenName, 
    familyName, 
    currentPassword,
    password,
    confirmPassword,
    editPassword,
    onEditPasswordClick,
    onChange,
    loading,
    updating,
    onUpdate
}) => {
    return (
        <div>
            <div className="top-bar">
                <p className="title">Account</p>
                <p>Change your basic account settings</p>
            </div>
            {loading && (
                <div className="loader-container">
                    <div className="ui active inverted dimmer">
                        <div className="ui text loader huge">Loading</div>
                    </div>
                </div>
            )}
            <div className={`body ${loading?'opacify':''}`}>
                <div className="ui form huge">
                    <div className="field">
                        <label className="disabled">USERNAME <i className="ban icon"></i></label>
                        <input 
                            disabled type="text" 
                            name="username" 
                            placeholder="Username"
                            value={username}
                        />
                    </div>

                    { editPassword 
                      ? (
                            <div className="animated flipInX" style={{marginBottom: '20px'}}>
                                <div className="field">
                                    <label>CURRENT PASSWORD</label>
                                    <input 
                                        type="password" 
                                        name="currentPassword" 
                                        placeholder="Current Password"
                                        onChange={onChange}
                                        value={currentPassword}
                                    />
                                </div>
                                <div className="field">
                                    <label>PASSWORD</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        placeholder="Password"
                                        onChange={onChange}
                                        value={password}
                                    />
                                </div>
                                <div className="field">
                                    <label>CONFIRM PASSWORD</label>
                                    <input 
                                        type="password" 
                                        name="confirmPassword" 
                                        placeholder="Confirm password"
                                        onChange={onChange}
                                        value={confirmPassword}
                                    />
                                </div>
                            </div>
                        )
                      : type === 'local' && (
                            <div className="field">
                                <label>PASSWORD</label>
                                <input disabled type="password" name="password" value="password"/>
                                <div 
                                    className="edit-password"
                                    onClick={onEditPasswordClick}
                                >
                                    Edit
                                </div>
                            </div>
                        )
                    }

                    <div className="field">
                        <label>EMAIL</label>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="Email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="field">
                        <label>NAME</label>
                        <div className="two fields">
                            <div className="field">
                                <input 
                                    type="text" 
                                    name="givenName" 
                                    placeholder="Given Name"
                                    value={givenName}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="field">
                                <input 
                                    type="text" 
                                    name="familyName" 
                                    placeholder="Family Name"
                                    value={familyName}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="btn-container">
                        <button 
                            className={`ui pink huge button ${updating?'loading':''}`}
                            onClick={
                                () => {
                                    onUpdate({
                                        currentPassword,
                                        password,
                                        confirmPassword,
                                        email,
                                        givenName,
                                        familyName
                                    });
                                }
                            }
                        >Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account