import React from 'react'

const Result = ({username, onClick}) => {
    return (
        <li onClick={onClick}>
            {username}
        </li>
    )
}

export default Result