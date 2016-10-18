import React, { Component } from 'react';
import Channel from './Channel';
import { connect } from 'react-redux';
import { checkValidity } from 'actions/channel';
import { bindActionCreators } from 'redux';
import { Spinner } from 'components';

class ChannelCheck extends Component {

    routes = {
        '/auth': true,
        '/404': true
    }

    async componentDidMount() {

        const { params, pathname, ChannelActions } = this.props;

        if(this.routes[pathname]) {
            return;
        }
        
        await ChannelActions.checkValidity(params.username);
        if(!this.props.status.valid) {
            this.context.router.transitionTo('/404');
        }
    }
    
    
    render() {

        const { pathname, params, status } = this.props;

        // if params is one of the routes, show nothing.
        if(this.routes[pathname]) {
            return <div/>
        } 

        if (status.checking) {
            return <Spinner/>
        }

        if (!status.valid) {
            return <div/>
        }

        return <Channel {...{pathname, params}}/>

    }
}

ChannelCheck.contextTypes = {
  router: React.PropTypes.object
};

ChannelCheck = connect(
    state => ({
        status: {
            valid: state.channel.valid,
            checking: state.channel.requests.checkValidity.fetching
        }
    }),
    dispatch => ({
        ChannelActions: bindActionCreators({
            checkValidity
        }, dispatch)
    })
)(ChannelCheck)

export default ChannelCheck;