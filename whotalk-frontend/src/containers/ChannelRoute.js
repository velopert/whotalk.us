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
        const { params, status, ChannelActions } = this.props;

        if(!status.session.logged) {
            this.context.router.transitionTo({
                pathname: '/auth',
                state: { prevPath: location.pathname }
            });

            notify({type: 'warning', message: 'You are not logged in'});
            return;
        }

        ChannelActions.follow(params.username);
    }

    @autobind
    handleUnfollow() {
        const { params, status, ChannelActions } = this.props;

        ChannelActions.unfollow(params.username);
    }

    @autobind
    openFocusBox(type) {
        const { UIActions, ChannelActions, params } = this.props;
        UIActions.toggleFocusBox();
        UIActions.showFocusBox(type);

        switch(type) {
            case 'followers':
                ChannelActions.getFollowers(params.username);
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

    render() {
        const {params, pathname, status} = this.props;
        const {
            handleFollow,
            handleUnfollow,
            handleCloseBox,
            openFocusBox
        } = this;



        return (
            <div className="channel">
                { (status.focusBox.type === 'followers') ? <Channel.UserList closing={status.focusBox.closing} userList={status.userList} loading={status.getFollowersPending}/> : null }
                <Channel.Box isClosing={status.boxState === 'closing'} height={status.clientHeight-270 + 'px'}>
                    <Channel.Circle/>
                    <Channel.Profile username={params.username} channelInfo={status.channelInfo}/>
                    <Channel.Info channelInfo={status.channelInfo} onOpen={openFocusBox}/>
                    <Channel.Buttons
                        followed={status.channelInfo.followed}
                        pending={status.followPending || status.unfollowPending}
                        onEnter={handleCloseBox}
                        onFollow={handleFollow}
                        onUnfollow={handleUnfollow}
                        disableFollow={status.session.user.common_profile.username === params.username }/>
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
        clientHeight: state.ui.clientHeight,
        followPending: state.channel.requests.follow.fetching,
        unfollowPending: state.channel.requests.unfollow.fetching,
        focusBox: state.ui.focusBox,
        userList: state.channel.focusBox.userList,
        getFollowersPending: state.channel.requests.getFollowers.fetching
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