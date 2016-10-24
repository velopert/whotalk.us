import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Channel} from 'components';
const Chat = Channel.Chat;
import * as ui from 'actions/ui';
import * as form from 'actions/form';
import autobind from 'autobind-decorator';

class ChannelRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unmounting: false
        };
    }
    componentDidMount() {
        const {UIActions} = this.props;
        UIActions.setHeaderTransparency(false);
        UIActions.setFooterSpace(false);
        UIActions.setChannelBoxState('default');
        
        // disable overflow for 0.7 seconds
        document.body.style.overflow = "hidden";
        setTimeout(() => {
            document.body.style.overflow = ""
            UIActions.setFooterVisibility(true);
        }, 700);
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
        }, 700);
    }

    @autobind
    handleEnterChannel() {
        this.handleCloseBox();
    }

    @autobind
    handleChange(e) {
        const {FormActions} = this.props;
        FormActions.changeInput({form: 'chat', name: e.target.name, value: e.target.value})
    }

    componentWillUnmount() {
        const {UIActions} = this.props;
        //UIActions.setFooterVisibility(true);
    }

    
    

    render() {
        const {params, pathname, status} = this.props;
        const {handleEnterChannel, handleChange} = this;

        const showStartButton = /(default|selecting)$/.test(status.chatState);
        const showChannel = status.chatState === 'selecting';

        return (
            <div className="channel">

                {status.boxState !== 'closed'
                    ? (
                        <Channel.Box isClosing={status.boxState === 'closing'}>
                            <Channel.Circle/>
                            <Channel.Profile username={params.username} channelInfo={status.channelInfo}/>
                            <Channel.Info/>
                            <Channel.Buttons onEnter={handleEnterChannel}
                            disableFollow={status.session.user.common_profile.username === params.username}/>
                        </Channel.Box>
                    )
                    : (
                        <Chat.Screen>
                            { showStartButton ? <Chat.Start/> : <Chat.Input onChange={handleChange}/> }
                             <Chat.Select/>
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
        chatState: state.ui.channel.chat.state,
        session: state.auth.session,
        form: {
            message: state.form.message
        }
    }
}), dispatch => ({
    FormActions: bindActionCreators(form, dispatch),
    UIActions: bindActionCreators({
        setHeaderTransparency: ui.setHeaderTransparency,
        setFooterSpace: ui.setFooterSpace,
        setFooterVisibility: ui.setFooterVisibility,
        setChannelBoxState: ui.setChannelBoxState
    }, dispatch)
}))(ChannelRoute);

export default ChannelRoute;