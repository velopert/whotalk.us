import React from 'react';

const Button = ({ following, onClick, disabled }) => {
    return (
        <div className={`button ${following?'active':''} ${disabled ? 'disabled': ''}`} onClick={onClick}>
            <i className={`${following?'remove':'add'} user icon large`}></i>
        </div>
    );
};

export default Button;