import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ChannelBox } from 'components';
import * as ui from 'actions/ui';

class Channel extends Component {
    componentDidMount() {
        const { UIActions } =  this.props;
        UIActions.setHeaderTransparency(false);
    }
    
    render() {
        const { params, pathname } = this.props;
        return (
            <div className="channel">
                <ChannelBox/>
            </div>
        );
    }
}

Channel.contextTypes = {
  router: React.PropTypes.object
};

Channel = connect(
    state => ({
        status: {
            // reuse username check from register
            valid: state.auth.register.status.usernameExists
        }
    }),
    dispatch => ({
        UIActions: bindActionCreators({
            setHeaderTransparency: ui.setHeaderTransparency
        }, dispatch)
    })
)(Channel);

export default Channel;