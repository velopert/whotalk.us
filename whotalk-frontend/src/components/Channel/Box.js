import React from 'react';

const Box = ({children, isClosing, height}) => {
    return (
        <div className={`box slideUp ${isClosing?'slideDown':''}`} style={{height}}>
            {children}
        </div>
    );
};

export default Box;