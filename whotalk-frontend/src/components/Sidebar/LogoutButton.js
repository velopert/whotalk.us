import React from 'react';

const LogoutButton = ({onClick}) => (
    <div
        className="logout-button circular-button"
        data-content="Logout"
        data-variation="inverted">
        <button className="ui circular pink icon button" onClick={onClick}>
            <i className="sign out icon"></i>
        </button>
    </div>
);

export default LogoutButton;