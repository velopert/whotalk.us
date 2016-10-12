import React from 'react';

const SettingsButton = ({onClick}) => (
    <div
        className="settings-button circular-button"
        data-content="Settings"
        data-variation="inverted">
        <button className="ui circular grey icon button">
            <i className="setting icon"></i>
        </button>
    </div>
);

export default SettingsButton;