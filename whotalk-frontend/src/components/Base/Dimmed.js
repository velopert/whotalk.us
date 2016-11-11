import React from 'react';

const Dimmed = ({enable, onClick, isSidebar}) => {
    return (
        <div
            className={`dimmed ${enable
            ? 'enable'
            : ''}`}
            onClick={onClick}
            style={isSidebar
            ? {
                zIndex: 5
            }
            : null}></div>
    );
};

export default Dimmed;