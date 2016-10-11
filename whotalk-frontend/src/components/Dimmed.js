import React from 'react';

const Dimmed = ({enable, onClick}) => {
    return (
        <div className={`dimmed ${enable ? 'enable' : ''}`} onClick={onClick}>
            
        </div>
    );
};

export default Dimmed;