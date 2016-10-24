import React from 'react';

const Buttons = ({onEnter, disableFollow}) => {
    return (
        <div className="ui grid stackable buttons">
            <div className="ten wide column">
                <button className="ui inverted pink button" onClick={onEnter}>
                    <i className="sign in icon"></i>
                    ENTER CHANNEL
                </button>
            </div>
            <div className="six wide column">
                <button className="ui inverted button grey" disabled={disableFollow}>
                     <i className="add user icon"></i>
                    FOLLOW
                </button>
            </div>
        </div>
    );
};

export default Buttons;