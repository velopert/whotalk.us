import React, {Component} from 'react';
import { Chat } from 'components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Scrollbars} from 'react-custom-scrollbars';

import * as ui from 'actions/ui';
import * as form from 'actions/form';
import * as channel from 'actions/channel';

import sender from 'socket/packetSender';

import * as socket from 'socket';
import * as socketHelper from 'socket/helper';
import {client as SEND} from 'socket/packetTypes';

import autobind from 'autobind-decorator';

import {injectIntl} from 'react-intl';
import { prepareMessages } from 'locale/helper';



class ChatRoute extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clientHeight: 0,
            prevScrollHeight: 0,
            loading: false
        };
    }

    componentDidMount() {
        const {params, UIActions, ChannelActions} = this.props;
        UIActions.initialize('channel');
        ChannelActions.initialize(params.username);
        UIActions.setHeaderTransparency(false);
        UIActions.setFooterVisibility(false);

        // disable overflow for 0.7 seconds
        document.body.style.overflow = "hidden";
        setTimeout(() => {
            document.body.style.overflow = ""
        }, 700);


        this.connectToChannel();

    }

    @autobind
    async connectToChannel() {
        const {params, ChannelActions, intl} = this.props;

        const promises = [
            ChannelActions.getRecentMsg(params.username),
            ChannelActions.getStatusMessage(params.username)
        ];

        try {
            await Promise.all(promises);
        } catch(e) {
            console.log(e);
        }

        socket.configure(intl);
        socket.init();
        this.handleShowStatusMessage();
    }

    @autobind
    async loadPrevious() {
        const {ChannelActions, params} = this.props;
        const prevScrollHeight = this.state.prevScrollHeight;
        await ChannelActions.getMsgBefore({
            username: params.username,
            cursorId: this.props.status.chatData[0].payload.suID
        });

        const scrollHeight = this.scrollBox.getScrollHeight();
        
        this.scrollBox.scrollTop(scrollHeight - prevScrollHeight);
        this.setState({
            loading: false
        });
    }

    @autobind
    scrollToBottom() {
        // SCROLL TO BOTTOM
        this
            .scrollBox
            .scrollTop(this.scrollBox.getScrollHeight());
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

    @autobind
    handleSend(message) {
        const {status, ChannelActions, FormActions} = this.props;
        const uID = socketHelper.generateUID();
        const data = {
            message,
            uID
        };
        sender.message(data);
        ChannelActions.writeMessage({
            type: SEND.MSG,
            payload: {
                anonymous: status.identity === 'anonymous',
                date: (new Date()).getTime(),
                message,
                uID,
                suID: uID,
                username: status.socket.username
            }
        });
        this.scrollToBottom();
    }

    @autobind
    handleFailure(index) {
        const {ChannelActions} = this.props;
        ChannelActions.messageFailure(index);
    }

    @autobind
    handleRemove(index) {
        const {ChannelActions} = this.props;
        ChannelActions.removeMessage(index);
    }

    @autobind
    handleScroll(e) {

        const scrollTop = this.scrollBox.getScrollTop();
        const scrollHeight = this.scrollBox.getScrollHeight();
        const clientHeight = this.scrollBox.getClientHeight();

        if(scrollTop < 60 && !this.state.loading && !this.props.status.top) {
            console.log('loading!');
            this.setState({
                loading: true,
                prevScrollHeight: scrollHeight
            });
            this.loadPrevious();
        }

        console.log(scrollTop, scrollHeight, clientHeight)
    }

    handleToggleOnlineList = () => {
        const {UIActions, status} = this.props;
        UIActions.setChannelChatState({onlineList: !status.onlineList})
    }

    handleShowStatusMessage = () => {
        const {UIActions, status} = this.props;
        UIActions.setChannelChatState({statusMessage: true})
        setTimeout(
            () => {
                UIActions.setChannelChatState({statusMessage: false});
            }, 3000
        );
        

    }

    shouldComponentUpdate(nextProps, nextState) {

        // update when client resize
        if (nextProps.status.clientHeight !== this.props.status.clientHeight) {
            return true;
        }

        // loading status won't affect rendering
        // prevScrollHeight won't affect rendering'
        if (nextState.loading !== this.state.loading) {
            return false;
        }

        const checkDiff = () => {
            if (nextProps.status.chatData.length > 0) {
                if (nextProps.status.chatData.length !== this.props.status.chatData.length) {
                    return true;
                }

                // check tempIndexes
                for (let index of this.props.status.tempDataIndex) {
                    if (nextProps.status.chatData[index].payload.suID !== this.props.status.chatData[index].payload.suID) {
                        return true;
                    }
                }
                return false;
            } else {
                return false;
            }
        }

        const compareObject = JSON.stringify({
            ...this.props.status,
            chatData: null
        }) !== JSON.stringify({
            ...nextProps.status,
            chatData: null
        });

        // if compareObject is false, it will do checkDiff
        return compareObject || checkDiff();

    }

    componentDidUpdate(prevProps, prevState) {

        const scrollHeight = this.scrollBox.getScrollHeight();

        if (prevProps.status.chatData.length !== this.props.status.chatData.length) {
            const scrollTop = this.scrollBox.getScrollTop();
            const clientHeight = this.scrollBox.getClientHeight();
            if(scrollHeight - scrollTop - clientHeight < 300 || this.state.prevScrollHeight - clientHeight < 300) {
                this.scrollToBottom();
            }
        }

        this.setState({
            prevScrollHeight: scrollHeight
        });
    }

    render() {

        const {status, params} = this.props;

        const {
            handleOpenSelect,
            handleSelect,
            handleCloseSelect,
            handleSend,
            handleFailure,
            handleRemove,
            handleScroll,
            handleToggleOnlineList,
            handleShowStatusMessage
        } = this;

        const showStartButton = !status.chatState.started;
        const showSelect = status.chatState.selecting;
        const selectClosing = status.chatState.closing;

        return (
            <Chat.Screen>
                <Chat.OnlineListButton 
                    onClick={handleToggleOnlineList}
                    userCount={status.userList.length}
                    loading={!status.connected}
                />
                <Chat.OnlineList
                    show={status.onlineList}
                    users={status.userList}
                    onClose={handleToggleOnlineList}
                    owner={status.channelName}
                />
                <Chat.StatusMessage 
                    hide={status.statusMessage === ""}
                    visible={status.statusMessageVisibility}
                    onShow={handleShowStatusMessage}
                >
                    {status.statusMessage}
                </Chat.StatusMessage>
                <Scrollbars
                    style={{
                    width: '100%',
                    height: status.clientHeight - 120 + 'px',
                    borderBottom: '1px solid rgba(0,0,0,0.10)'
                }}
                    className="scrollbox"
                    onScroll={handleScroll}
                    ref={(ref) => {
                    this.scrollBox = ref
                }}>
                    <Chat.MessageList
                        data={status.chatData}
                        channel={params.username}
                        showLoader={!status.top}
                        onFailure={handleFailure}
                        onRemove={handleRemove}
                        onSend={handleSend}/>
                </Scrollbars>
                {showStartButton
                    ? <Chat.Start onClick={handleOpenSelect} disabled={(!status.socket.enter)}/>
                    : <Chat.Input onSend={handleSend} controlled={status.socket.controlled}/>}
                {showSelect
                    ? <Chat.Select
                            username={status.session.user.common_profile.username}
                            onClose={handleCloseSelect}
                            onSelect={handleSelect}
                            closing={selectClosing}/>
                    : undefined}
            </Chat.Screen>
        );
    }

    componentWillUnmount() {
        console.log(socket);
        if (socket.getSocket()) {
            socket.close();
        }
    }

}

ChatRoute = connect(state => ({
    status: {
        channelName: state.channel.info.username,
        chatState: state.ui.channel.chat,
        session: state.auth.session,
        socket: state.channel.chat.socket,
        identity: state.channel.chat.identity,
        chatData: state.channel.chat.data,
        tempDataIndex: state.channel.chat.tempDataIndex,
        top: state.channel.chat.top,
        clientHeight: state.ui.clientSize.height,
        userList: state.channel.chat.userList,
        userCount: state.channel.chat.userList.length,
        connected: state.channel.chat.socket.enter,
        onlineList: state.ui.channel.chat.onlineList,
        statusMessage: state.channel.chat.statusMessage,
        statusMessageVisibility: state.ui.channel.chat.statusMessage
    }
}), dispatch => ({
    ChannelActions: bindActionCreators(channel, dispatch),
    FormActions: bindActionCreators(form, dispatch),
    UIActions: bindActionCreators({
        initialize: ui.initialize,
        setHeaderTransparency: ui.setHeaderTransparency,
        setFooterVisibility: ui.setFooterVisibility,
        setChannelChatState: ui.setChannelChatState
    }, dispatch)
}))(ChatRoute);

export default injectIntl(ChatRoute);