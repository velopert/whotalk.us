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

        const {
            userList,
            type,
            onFollow,
            onUnfollow,
            logged,
            myUsername
        } = this.props;

        if (userList.length === 0) 
            return null;
        
        const f = (type === 'followers')
            ? 'follower'
            : 'followee';

        return userList.map((follow, i) => {
            const {username, givenName, familyName, thumbnail} = follow[f].common_profile;

            return <UserInfo
                key={follow._id}
                username={username}
                givenName={givenName}
                familyName={familyName}
                thumbnail={thumbnail}
                following={(follow.following)
                            ? true
                            : false}
                hideButton={!logged || username === myUsername}
                disabled={follow.disabled}
                onFollow={
                    () => {onFollow({index: i, username})
                }}
                onUnfollow={
                    () => {onUnfollow({index: i, username})
                }}/>
        });
    }

    @autobind
    handleScroll() {

        if (!this.scrollbar || this.props.isLast) {
            return;
        }

        const {onLoadMore, loading} = this.props;

        const sc = this.scrollbar;
        const diff = sc.getScrollHeight() - sc.getScrollTop() - sc.getClientHeight();

        if (diff < 25 && !loading) {
            onLoadMore();
        }
    }

    render() {
        const {closing, loading, userList, isLast, type} = this.props;
        const {round} = this.state;
        const {renderUsers, handleScroll} = this;

        return (
            <div
                className={`user-list popOut ${closing
                ? 'popIn'
                : ''}`}>
                {closing || round
                    ? null
                    : (
                        <div>
                            <div className="title">{type.toUpperCase()}</div>

                            {loading
                                ? <div className="ui active centered loader"/>
                                : null}
                            {(!loading && userList.length === 0)
                                ? <div className="empty">LIST IS EMPTY</div>
                                : ''}
                            <Scrollbars
                                style={{
                                height: 267
                            }}
                                ref={(ref) => {
                                this.scrollbar = ref
                            }}
                                onScroll={handleScroll}>
                                {renderUsers()}
                            </Scrollbars>

                        </div>
                    )}
            </div>
        );
    }
}

export default UserList;