import React from 'react'

const Contents = ({children}) => {
    return (
        <div className="contents">
            <div className="ui container">
                {children}
            </div>
        </div>
    );
}

export default Contents;