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

import {Scrollbars} from 'react-custom-scrollbars';

import * as socket from 'socket';
import * as s from 'socket';

class ChannelRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unmounting: false,
            clientHeight: 0
        };
    }

    @autobind
    updateClientHeight() {
        this.setState({clientHeight: document.body.clientHeight});
    }

    componentWillMount() {
        this.updateClientHeight();
    }

    componentDidMount() {
        const {UIActions} = this.props;
        UIActions.setHeaderTransparency(false);
        UIActions.setFooterSpace(false);

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
            UIActions.setChannelBoxState('closed');
            document.body.style.overflow = "";
            UIActions.setFooterVisibility(false);
        }, 300);
    }

    @autobind
    handleEnterChannel() {
        this.handleCloseBox();
        socket.init();
    }

    @autobind
    handleChange(e) {
        const {FormActions} = this.props;
        FormActions.changeInput({form: 'chat', name: e.target.name, value: e.target.value})
    }

    @autobind
    handleOpenSelect() {
        const {UIActions} = this.props;
        UIActions.setChannelChatState({selecting: true});
    }

    @autobind
    handleSelect(identity) {
        const {status, ChannelActions, UIActions} = this.props;
        ChannelActions.setIdentity(identity);
        UIActions.setChannelChatState({started: true});

        sender.auth(status.session.sessionID, identity === 'anonymous');
        this.handleCloseSelect();
    }

    @autobind
    handleCloseSelect() {
        const {UIActions} = this.props;
        UIActions.setChannelChatState({closing: true});
        setTimeout(() => {
            UIActions.setChannelChatState({closing: false, selecting: false})
        }, 700);
    }

    componentWillUnmount() {
        const {UIActions} = this.props;
        //UIActions.setFooterVisibility(true);
        console.log(socket);
        if (socket.getSocket()) {
            socket.close();
        }

        window.removeEventListener("resize", this.updateClientHeight);
    }

    render() {
        const {params, pathname, status} = this.props;
        const {handleEnterChannel, handleChange, handleOpenSelect, handleSelect, handleCloseSelect} = this;

        const showStartButton = !status.chatState.started;
        const showSelect = status.chatState.selecting;
        const selectClosing = status.chatState.closing;

        return (
            <div className="channel">

                {status.boxState !== 'closed'
                    ? (
                        <Channel.Box isClosing={status.boxState === 'closing'}>
                            <Channel.Circle/>
                            <Channel.Profile username={params.username} channelInfo={status.channelInfo}/>
                            <Channel.Info/>
                            <Channel.Buttons
                                onEnter={handleEnterChannel}
                                disableFollow={status.session.user.common_profile.username === params.username}/>
                        </Channel.Box>
                    )
                    : (
                        <Chat.Screen>
                            <Scrollbars
                                style={{
                                width: '100%',
                                height: this.state.clientHeight - 120 + 'px',
                                borderBottom: '1px solid rgba(0,0,0,0.10)'
                            }}>
                                <Chat.MessageList/>
                            </Scrollbars>
                            {showStartButton
                                ? <Chat.Start onClick={handleOpenSelect} disabled={(!status.socket.enter)}/>
                                : <Chat.Input onChange={handleChange}/>}
                            {showSelect
                                ? <Chat.Select
                                        username={params.username}
                                        onClose={handleCloseSelect}
                                        onSelect={handleSelect}
                                        closing={selectClosing}/>
                                : undefined}
                        </Chat.Screen>
                    )
}

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
        chatState: state.ui.channel.chat,
        session: state.auth.session,
        form: {
            message: state.form.message
        },
        socket: state.channel.chat.socket
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
        setChannelChatState: ui.setChannelChatState
    }, dispatch)
}))(ChannelRoute);

export default ChannelRoute;