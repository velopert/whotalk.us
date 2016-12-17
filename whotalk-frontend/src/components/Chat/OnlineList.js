import React from 'react'

// const User = ({username, anonymous}) => {
//     return (
//         <div className="user">

//         </div>
//     )
// }


const OnlineList = () => {
    return (
        <div className="online-list reveal">
            <div className="title">ONLINE USERS</div>
            <button className="ui mini black button close">Close</button>
            <ul>
                <li>auser</li>
                <li>anotherUser</li>
                <li className="anonymous">anonymous</li>
            </ul>
        </div>
    )
}

export default OnlineList