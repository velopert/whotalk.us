import React, {Component} from 'react'
import Circle from './Circle';
import autobind from 'autobind-decorator';
import { UserInfo } from 'components/Common';
import Message from './Message';


/* FeedTypes:
    - FOLLOW 
    - CHAT
*/

// {
//     followee: {
//         username: 'user1',
//         thumbnail: 'none',
//         givenName: 'Test',
//         familyName: 'User',
//     },
//     follower: {
//         username: 'user2',
//         thumbnail: 'none'
//     },
//     following: false,
//     date: new Date(),
// }


// const chat = {
//       "_id": "5835bbdd8bd79e5fbc875863",
//       "type": "CHAT",
//       "date": "2016-11-23T15:55:09.580Z",
//       "payload": {
//         "chat": {
//           "username": "tester_blabla",
//           "anonymous": false,
//           "initId": "5835bbdc8bd79e5fbc875862",
//           "channel": "velopert",
//           "lastId": "5835bbe78bd79e5fbc875864"
//         },
//         "chatData": [
//           {
//             "_id": "5835bbdc8bd79e5fbc875862",
//             "username": "tester_blabla",
//             "message": "말걸고",
//             "date": "2016-11-23T15:55:08.874Z"
//           }
//         ]
//       },
//       "__v": 0
//     }
class Feed extends Component {

    mapToMessages = (messages) => {
        return messages.map(
            message => (
                <Message
                    username={message.username}
                    message={message.message}
                    key={message._id}
                />
            )
        )
    }

    mapToUserInfos(followees) {
        return followees.map(
            (followee, i) => (
                <UserInfo 
                    username={followee.username} 
                    givenName={followee.givenName} 
                    familyName={followee.familyName}
                    key={i}
                />
            )
        )
    }

    renderFeed = () => {
        const { type, payload } = this.props;
        
        if(type === 'FOLLOW') {
            const length = payload.follow.followee.length;
            return (
                <div>
                    {/*<span className="user">{payload.follow.follower.username}</span> is following <span className="user">{payload.follow.followee.username}</span>
                    <UserInfo username={payload.follow.followee.username} givenName={payload.follow.followee.givenName} familyName={payload.follow.followee.familyName}/>*/}
                    <span className="user">{payload.follow.follower.username}</span> is following 
                    {length === 1 ? <span className="user">{payload.follow.followee.username}</span> : <span><span className="number"> {length} </span>users</span>}
                    {this.mapToUserInfos(payload.follow.followee)}
                </div>
            )
        } else if (type === 'CHAT') {
            return (
                <div>
                    <span className="user">{payload.chat.username}</span> has talked to <span className="user">{payload.chat.channel}</span>
                    <div className="first-message"><span className="quote">“</span>{payload.chatData[0].message}<span className="quote">”</span></div>
                    <div className="message-container">
                        {this.mapToMessages(payload.chatData)}
                    </div>
                </div>
            )
        }
    }

    render () {
        const { renderFeed } = this;

        return (
            <div className="feed fadeIn7">
                <div className="feed-content">
                    <div className="head">
                        <Circle/>
                    </div>
                    <div className="body">
                        {renderFeed()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Feed