import React from 'react';

const Input = ({onChange}) => {
    return (
        <div className="input">
            <div className="message">
                <input type="text" name="message" placeholder="Write a message" onChange={onChange}/>
            </div>
            <div className="send-button">
                <button className="circular ui icon button pink">
                    <i className="icon send"></i>
                </button>
            </div>
        </div>
    );
};

export default Input;