import React from 'react'

const Unregister = ({visible, onClose, onUnregister}) => {

    if(!visible) return null;

    return (
        <div className="unregister-wrapper">
            <div className="unregister animated flipInX">
                <div className="title">
                    <i className="remove user icon big"></i>
                </div>
                <div className="question">
                    Do you <b>really</b> want to unregister?
                </div>
                <div className="button-container">
                    <div className="button" onClick={onUnregister}>YES</div>
                    <div className="button" onClick={onClose}>NO</div>
                </div>
            </div>
        </div>
    )
}

export default Unregister