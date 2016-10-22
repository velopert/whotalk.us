import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Channel } from 'components';
import * as ui from 'actions/ui';

class ChannelRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unmounting: false
        };
    }
    componentDidMount() {
        const { UIActions } =  this.props;
        UIActions.setHeaderTransparency(false);
        UIActions.setFooterSpace(false);
        
        // disable overflow for 0.7 seconds
        document.body.style.overflow = "hidden";
        setTimeout(
            () => { document.body.style.overflow = "" }, 700
        );
    }
    
    render() {
        const { params, pathname, status } = this.props;
        return (
            <div className="channel">
                <Channel.Box>
                    <Channel.Circle/>
                    <Channel.Profile username={params.username} channelInfo={status.channelInfo} />
                    <Channel.Info/>
                </Channel.Box>
            </div>
        );
    }
}

ChannelRoute.contextTypes = {
  router: React.PropTypes.object
};

ChannelRoute = connect(
    state => ({
        status: {
            channelInfo: state.channel.info
        }
    }),
    dispatch => ({
        UIActions: bindActionCreators({
            setHeaderTransparency: ui.setHeaderTransparency,
            setFooterSpace: ui.setFooterSpace
        }, dispatch)
    })
)(ChannelRoute);

export default ChannelRoute;