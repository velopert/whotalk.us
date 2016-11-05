import React from 'react';

const Start = ({onClick, disabled}) => {
    return (
        <div className="start" onClick={onClick}>
            <button className={`ui pink button ${disabled?'loading':''}`} disabled={disabled}>START TALKING</button>
        </div>
    );
};

export default Start;