import React from 'react'
import User from './User';

const Message = ({username, message, anonymous}) => {
    return (
        <div>
            <User username={username} anonymous={anonymous}/> {message}
        </div>
    )
}

export default Message