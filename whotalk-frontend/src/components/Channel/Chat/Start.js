import React from 'react';

const Start = ({onClick}) => {
    return (
        <div className="start" onClick={onClick}>
            <button className="ui pink button">START TALKING</button>
        </div>
    );
};

export default Start;