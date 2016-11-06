import React from 'react';

const Start = ({onClick, disabled}) => {
    return (
        <div className="start">
            <button className={`ui pink button ${disabled?'loading':''}`} disabled={disabled} onClick={onClick}>START TALKING</button>
        </div>
    );
};

export default Start;