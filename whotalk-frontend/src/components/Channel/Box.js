import React from 'react';

const Box = ({children}) => {
    return (
        <div className="box slideUp">
            {children}
        </div>
    );
};

export default Box;