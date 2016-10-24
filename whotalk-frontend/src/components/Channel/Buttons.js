import React from 'react';

const Buttons = ({onEnter}) => {
    return (
        <div className="ui grid stackable buttons">
            <div className="ten wide column">
                <div className="ui inverted pink button" onClick={onEnter}>
                    <i className="sign in icon"></i>
                    ENTER CHANNEL
                </div>
            </div>
            <div className="six wide column">
                <div className="ui inverted button grey">
                     <i className="rss icon"></i>
                    FOLLOW
                </div>
            </div>
        </div>
    );
};

export default Buttons;