import React from 'react';

const Screen = ({children}) => {
    return (
        <div className="screen bounceInRight">
            {children}
        </div>
    );
};

export default Screen;