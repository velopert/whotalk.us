import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Channel } from 'components';
import * as ui from 'actions/ui';

class ChannelRoute extends Component {
    componentDidMount() {
        const { UIActions } =  this.props;
        UIActions.setHeaderTransparency(false);
        UIActions.setFooterSpace(false);
        
        // disable overflow for 0.7 seconds
        document.body.style.overflow = "hidden";
        setTimeout(
            () => { document.body.style.overflow = "visible " }, 700
        );
    }
    
    render() {
        const { params, pathname } = this.props;
        return (
            <div className="channel">
                <Channel.Box>
                    <Channel.Circle>TESTING</Channel.Circle>
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
            // reuse username check from register
            valid: state.auth.register.status.usernameExists
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