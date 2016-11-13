import React from 'react';

const Container = ({children}) => {
    return (
        <div className="explore">
            <div className="gray-background">a</div>
            {children}
        </div>
    );
};

export default Container;