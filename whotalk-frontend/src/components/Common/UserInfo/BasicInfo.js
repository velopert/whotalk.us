import React from 'react';

const BasicInfo = ({username, name}) => {
    return (
        <div className="basic-info">
            <div className="username">{username}</div>
            <div className="name">{name}</div>
        </div>
    );
};

export default BasicInfo;