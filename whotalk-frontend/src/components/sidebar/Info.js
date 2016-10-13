import React from 'react';

const Info = ({name, username}) => (
    <div className="info">
        <div className="username">{username? `@${username}` : 'anonymous'}</div>
        <div className="name">{name}</div>
    </div>
);

export default Info;