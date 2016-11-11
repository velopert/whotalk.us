import React from 'react';

const Button = ({ following, onFollow, waiting }) => {
    return (
        <div className={`button ${following?'active':''} ${waiting ? 'disabled': ''}`} onClick={onFollow}>
            <i className={`${following?'remove':'add'} user icon large`}></i>
        </div>
    );
};

export default Button;