import React, {Component} from 'react'
import Circle from './Circle';
import autobind from 'autobind-decorator';
import { UserInfo } from 'components/Common';


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

class Feed extends Component {

    @autobind
    renderFeed() {
        const { type, payload } = this.props;
        if(type === 'FOLLOW') {
            return (
                <div>
                    <span className="user">{payload.follower.username}</span> is following <span className="user">{payload.followee.username}</span>
                    <UserInfo username={payload.followee.username} givenName={payload.followee.givenName} familyName={payload.followee.familyName}/>
                </div>
            )
        } else {
            
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