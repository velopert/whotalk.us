import React from 'react';

const Box = ({children, isClosing}) => {
    return (
        <div className={`box slideUp ${isClosing?'slideDown':''}`}>
            {children}
        </div>
    );
};

export default Box;