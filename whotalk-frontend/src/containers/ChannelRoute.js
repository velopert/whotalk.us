import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Channel, Dimmed} from 'components';

import * as ui from 'actions/ui';
import * as form from 'actions/form';
import * as channel from 'actions/channel';
import autobind from 'autobind-decorator';

import notify from 'helpers/notify';

class ChannelRoute extends Component {

    componentDidMount() {
        const {UIActions} = this.props;
        UIActions.initialize('channel');

        UIActions.setHeaderTransparency(false);
        UIActions.setFooterSpace(false);

        UIActions.setChannelBoxState('default');

        // disable overflow for 0.7 seconds
        document.body.style.overflow = "hidden";
        setTimeout(() => {
            document.body.style.overflow = ""
        }, 700);

        setTimeout(() => {
            //UIActions.setFooterVisibility(true);
        }, 1000);

        window.addEventListener("resize", this.updateClientHeight);
    }

    @autobind
    handleFollow() {
        const {params, status, ChannelActions} = this.props;

        if (!status.session.logged) {
            this
                .context
                .router
                .transitionTo({
                    pathname: '/auth',
                    state: {
                        prevPath: location.pathname
                    }
                });

            notify({type: 'warning', message: 'You are not logged in'});
            return;
        }

        ChannelActions.follow(params.username);
    }

    @autobind
    async handleFollowFromUserList({index, username}) {

        const {ChannelActions} = this.props;

        //ChannelActions.setUserListIndex(index);
        ChannelActions.toggleUserInfoFollowButton(index);
        try {
            await ChannelActions.followFromUserList(username);
        } catch (error) {}
        ChannelActions.toggleUserInfoFollowButton(index);

    }

    @autobind
    async handleUnfollowFromUserList({index, username}) {
        const {ChannelActions} = this.props;

        //ChannelActions.setUserListIndex(index);
        ChannelActions.toggleUserInfoFollowButton(index);
        try {
            await ChannelActions.unfollowFromUserList(username);
        } catch (error) {}

        ChannelActions.toggleUserInfoFollowButton(index);
    }

    @autobind
    handleUnfollow() {
        const {params, status, ChannelActions} = this.props;

        ChannelActions.unfollow(params.username);
    }

    @autobind
    openFocusBox(type) {
        const {UIActions, ChannelActions, params} = this.props;
        UIActions.toggleFocusBox();
        ChannelActions.clearUserList();
        UIActions.showFocusBox(type);

        switch (type) {
            case 'followers':
                ChannelActions.getFollowers({username: params.username});
                break;
            case 'following':
                ChannelActions.getFollowing({username: params.username});
                break;
            default:
                console.error('what?');
        }
    }

    @autobind
    handleCloseBox() {
        const {UIActions} = this.props;

        UIActions.setChannelBoxState('closing');

        document.body.style.overflow = "hidden";
        setTimeout(() => {
            document.body.style.overflow = ""
        }, 700);

        setTimeout(() => {
            this
                .context
                .router
                .transitionTo('/chat/' + this.props.params.username);
        }, 700);
    }

    @autobind
    handleLoadMore() {
        const {ChannelActions, status, params} = this.props;
        const type = status.focusBox.type;

        const followId = status.userList[status.userList.length - 1]._id;

        switch (type) {
            case 'followers':
                ChannelActions.getFollowers({username: params.username, followId});
                break;
            case 'following':
                ChannelActions.getFollowing({username: params.username, followId});
                break;
            default:
                console.error('what?');
        }
    }

    render() {
        const {params, pathname, status} = this.props;
        const {
            handleFollow,
            handleUnfollow,
            handleCloseBox,
            handleLoadMore,
            openFocusBox,
            handleFollowFromUserList,
            handleUnfollowFromUserList
        } = this;
        
        return (
            <div className="channel">
                {(status.focusBox.type !== null)
                    ? <Channel.UserList
                            type={status.focusBox.type}
                            onLoadMore={handleLoadMore}
                            onFollow={handleFollowFromUserList}
                            onUnfollow={handleUnfollowFromUserList}
                            closing={status.focusBox.closing}
                            userList={status.userList}
                            loading={status.getFollowersPending || status.getFollowingPending}
                            isLast={status.userListIsLast}
                            listIndex={status.userListIndex}
                            logged={status.session.logged}
                            myUsername={status.session.user.common_profile.username}/>
                    : null}
                <Channel.Box
                    isClosing={status.boxState === 'closing'}
                    height={status.clientHeight - 270 + 'px'}>
                    <Channel.Circle/>
                    <Channel.Profile username={params.username} channelInfo={status.channelInfo}/>
                    <Channel.Info channelInfo={status.channelInfo} onOpen={openFocusBox}/>
                    <Channel.Buttons
                        followed={status.channelInfo.followed}
                        pending={status.followPending || status.unfollowPending}
                        onEnter={handleCloseBox}
                        onFollow={handleFollow}
                        onUnfollow={handleUnfollow}
                        disableFollow={status.session.user.common_profile.username === params.username}/>
                </Channel.Box>
            </div>
        );
    }
}

ChannelRoute.contextTypes = {
    router: React.PropTypes.object
};

ChannelRoute = connect(state => ({
    status: {
        channelInfo: state.channel.info,
        boxState: state.ui.channel.box.state,
        session: state.auth.session,
        clientHeight: state.ui.clientSize.height,
        followPending: state.channel.requests.follow.fetching,
        unfollowPending: state.channel.requests.unfollow.fetching,
        focusBox: state.ui.focusBox,
        userList: state.channel.focusBox.userList,
        userListIsLast: state.channel.focusBox.isLast,
        userListIndex: state.channel.focusBox.listIndex,
        getFollowersPending: state.channel.requests.getFollowers.fetching,
        getFollowingPending: state.channel.requests.getFollowing.fetching
    }
}), dispatch => ({
    ChannelActions: bindActionCreators(channel, dispatch),
    FormActions: bindActionCreators(form, dispatch),
    UIActions: bindActionCreators({
        initialize: ui.initialize,
        setHeaderTransparency: ui.setHeaderTransparency,
        setFooterSpace: ui.setFooterSpace,
        setFooterVisibility: ui.setFooterVisibility,
        setChannelBoxState: ui.setChannelBoxState,
        toggleFocusBox: ui.toggleFocusBox,
        showFocusBox: ui.showFocusBox
    }, dispatch)
}))(ChannelRoute);

export default ChannelRoute;