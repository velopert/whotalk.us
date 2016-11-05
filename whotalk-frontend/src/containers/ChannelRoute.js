import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Channel} from 'components';
const Chat = Channel.Chat;
import * as ui from 'actions/ui';
import * as form from 'actions/form';
import * as channel from 'actions/channel';
import autobind from 'autobind-decorator';
import sender from 'socket/packetSender';

import * as socket from 'socket';
import * as socketHelper from 'socket/helper';
import {client as SEND} from 'socket/packetTypes';

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
            UIActions.setFooterVisibility(true);
        }, 1000);

        window.addEventListener("resize", this.updateClientHeight);
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
            handleCloseBox
        } = this;



        return (
            <div className="channel">
                <Channel.Box isClosing={status.boxState === 'closing'}>
                    <Channel.Circle/>
                    <Channel.Profile username={params.username} channelInfo={status.channelInfo}/>
                    <Channel.Info/>
                    <Channel.Buttons
                        onEnter={handleCloseBox}
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
    }
}), dispatch => ({
    ChannelActions: bindActionCreators(channel, dispatch),
    FormActions: bindActionCreators(form, dispatch),
    UIActions: bindActionCreators({
        initialize: ui.initialize,
        setHeaderTransparency: ui.setHeaderTransparency,
        setFooterSpace: ui.setFooterSpace,
        setFooterVisibility: ui.setFooterVisibility,
        setChannelBoxState: ui.setChannelBoxState
    }, dispatch)
}))(ChannelRoute);

export default ChannelRoute;