import React, {Component} from 'react';
import {UserInfo} from 'components/Common';
import {Scrollbars} from 'react-custom-scrollbars';
import autobind from 'autobind-decorator';

class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            round: true
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({round: false});
        }, 700);
    }

    @autobind
    renderUsers() {

        const {userList} = this.props;

        if (userList.length === 0) 
            return null;
        
        return userList.map(follow => {
            const {username, givenName, familyName, thumbnail} = follow.follower.common_profile;

            return <UserInfo
                key={follow._id}
                username={username}
                givenName={givenName}
                familyName={familyName}
                thumbnail={thumbnail}/>
        });
    }

    render() {
        const {closing, loading, userList} = this.props;
        const {round} = this.state;
        const {renderUsers} = this;

        return (
            <div
                className={`user-list popOut ${closing
                ? 'popIn'
                : ''}`}>
                {closing || round
                    ? null
                    : (
                        <div>
                            <div className="title">FOLLOWERS</div>
                            
                            {loading ? <div className="ui active centered loader"/> : null }
                            {(!loading && userList.length === 0) ? <div className="empty">THERE IS NO FOLLOWERS</div> : ''}
                            <Scrollbars
                                style={{
                                height: 267
                            }}>
                            {renderUsers()}
                            </Scrollbars>
                        </div>
                    )}
            </div>
        );
    }
}

export default UserList;