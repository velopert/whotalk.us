import React from 'react'

const Wrapper = ({children}) => {
    return (
        <div className="my-page">
            <div className="title-bar">
                    <div><i className="setting icon huge spin"></i></div>
                    <div className="text">MY PAGE</div>
            </div>
            <div className="contents">
                <div className="ui container">
                    <div className="ui grid stackable">
                       {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wrapper