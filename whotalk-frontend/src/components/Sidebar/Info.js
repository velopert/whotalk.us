import React from 'react';
import { Link } from 'react-router';

const Info = ({name, username}) => (
    <div className="info">
        <Link to={"/" + username}><div className="username">{username? `@${username}` : 'anonymous'}</div></Link>
        <div className="name">{name}</div>
    </div>
);

export default Info;