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
            <div className="title-bar">
                <div className="title">ONLINE USERS</div>
                <button className="ui mini red button circular icon close">
                    <i className="icon remove"></i>
                </button>
            </div>
            
            <ul>
                <li><i className="user icon"></i>auser</li>
                <li><i className="user yellow icon"></i>anotherUser</li>
                <li className="anonymous"><i className="spy icon"></i>anonymous</li>
            </ul>
        </div>
    )
}

export default OnlineList