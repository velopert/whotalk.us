import React from 'react';

const Container = ({children}) => {
    return (
        <div className="explore">
            <div className="gray-background"></div>
                {children}
        </div>
    );
};

export default Container;