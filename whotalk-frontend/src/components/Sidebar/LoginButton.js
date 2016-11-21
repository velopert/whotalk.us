import React from 'react';


const SignInButton = ({onClick}) => {
    return (
        <div className="login-button">
            <button
                className="huge ui button grey"
                onClick={onClick}
            >
                Sign In
            </button>
        </div>
    );
};



export default SignInButton;