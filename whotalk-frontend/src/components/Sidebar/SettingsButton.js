import React from 'react';



const SettingsButton = ({onClick}) => (
    <div
        className="settings-button circular-button"
        data-content="Settings"
        data-variation="inverted">
        <div onClick={onClick} className="ui circular grey icon button">
            <i className="setting icon"></i>
        </div>
    </div>
);

export default SettingsButton;