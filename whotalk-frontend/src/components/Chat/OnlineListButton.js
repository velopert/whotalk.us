import React from 'react'

const OnlineListButton = ({onClick, userCount, loading}) => {
    return (
        <div className="online-list-button" onClick={onClick}>
            {
                loading 
                ? (
                    <div className="ui active inline loader mini inverted"></div>
                )
                : (
                    <div>
                        <i className="user icon"></i>
                        <span>{userCount}</span>
                    </div>
                )
            }
        </div>
    );
};

export default OnlineListButton;