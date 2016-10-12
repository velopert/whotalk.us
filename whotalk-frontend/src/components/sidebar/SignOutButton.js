import React from 'react';

const SignOutButton = ({onClick}) => (
    <div
        className="signout-button circular-button"
        data-content="Sign Out"
        data-variation="inverted">
        <button className="ui circular pink icon button">
            <i className="sign out icon"></i>
        </button>
    </div>
);

export default SignOutButton;