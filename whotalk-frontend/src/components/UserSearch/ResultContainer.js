import React from 'react'

const ResultContainer = ({children}) => {
    const childrenCount = React.Children.count(children);

    // show nothing when childless
    if(childrenCount === 0) { 
        return null;
    }

    return (
        <ul className="result-container">
            {children}
        </ul>
    )
}

export default ResultContainer