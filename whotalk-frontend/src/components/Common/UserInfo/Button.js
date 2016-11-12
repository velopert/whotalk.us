import React from 'react';

const Button = ({ following, onFollow, disabled }) => {
    return (
        <div className={`button ${following?'active':''} ${disabled ? 'disabled': ''}`} onClick={onFollow}>
            <i className={`${following?'remove':'add'} user icon large`}></i>
        </div>
    );
};

export default Button;