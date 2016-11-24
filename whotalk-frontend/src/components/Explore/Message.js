import React from 'react'

const Message = ({username, message, anonymous}) => {
    return (
        <div>
            <span className="user">{username}</span> {message}
        </div>
    )
}

export default Message