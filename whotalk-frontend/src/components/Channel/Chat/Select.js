import React from 'react';

const Select = ({username, closing, onClose}) => {
    return (
        <div className={`select fadeIn7 ${closing ? ' fadeOut' : ''}`}>
            <div className="exit" onClick={onClose}>
                <i className="icon remove"/>
            </div>
            <div className="wrapper">
                <div className="title">SELECT YOUR IDENTITY</div>
                <div className="options">
                    <button className="inverted basic pink ui icon button">
                        <i className="icon user"></i>
                        {username}
                    </button>

                    <button className="inverted basic pink ui icon button">
                        <i className="icon spy"></i>
                        anonymous
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Select;