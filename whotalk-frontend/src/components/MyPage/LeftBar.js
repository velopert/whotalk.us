import React from 'react'

const LeftBar = () => {
    return (
        <div className="four wide column left-bar">
            <div className="menu">
                <div className="item active">
                    <span>Account</span>
                </div>
                <div className="item">
                    <span>Channel</span>
                </div>
                <div className="item">
                    <span>Notification</span>
                </div>
                <div className="item">
                    <span style={{color: '#c92a2a'}}>Unregister</span>
                </div>
            </div>
        </div>
    )
}

export default LeftBar