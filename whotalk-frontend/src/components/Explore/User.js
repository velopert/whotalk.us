import React from 'react'
import { Link } from 'react-router';


const User = ({username, anonymous=false}) => {

    if(anonymous) {
        return (
            <span className="anonymous">{username}</span>
        )
    }

    return (
        <Link to={"/" + username}>
            <span className="user">{username}</span>
        </Link>
    )
}

export default User