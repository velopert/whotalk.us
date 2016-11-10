import React from 'react';

const Buttons = ({
    followed,
    pending,
    onEnter,
    onFollow,
    onUnfollow,
    disableFollow
}) => {
    return (
        <div className="ui grid stackable buttons">
            <div className="ten wide column">
                <button className="ui inverted pink button" onClick={onEnter}>
                    <i className="sign in icon"></i>
                    ENTER CHANNEL
                </button>
            </div>
            <div className="six wide column">
                <button
                    className={`ui inverted button grey ${pending ? 'loading' : ''}`}
                    disabled={disableFollow || pending}
                    onClick={followed ? onUnfollow : onFollow}>
                    <i
                        className={`${followed ? 'remove' : 'add'} user icon`}></i>
                    {followed ? 'UNFOLLOWED' : 'FOLLOW'}
                </button>
            </div>
        </div>
    );
};

export default Buttons;