import React, { Component } from 'react';
import ChannelRoute from './ChannelRoute';
import { connect } from 'react-redux';
import * as channel from 'actions/channel';
import { setFooterVisibility, initialize } from 'actions/ui';
import { bindActionCreators } from 'redux';
import { Spinner } from 'components';
import autobind from 'autobind-decorator';

class ChannelCheck extends Component {

    routes = {
        '/explore': true,
        '/auth': true,
        '/404': true,
        '/chat': true,
        '/page': true,
        '/mypage': true
    }

    @autobind
    async getChannelData() {
        const { params, pathname, ChannelActions, UIActions } = this.props;

        if(this.routes[pathname]) {
            return;
        }

        UIActions.setFooterVisibility(false);
        UIActions.initialize('channel');
        ChannelActions.initialize(params.username);
    
        try {
            await ChannelActions.checkInfo(params.username);
        } catch(e) {
            if(!this.props.status.valid) {
                this.context.router.transitionTo('/404');
            }
        }
    }

    componentDidMount() {
        this.getChannelData();
    }

    componentDidUpdate(prevProps, prevState) {
        // handle goBack
        if(this.props.pathname !== prevProps.pathname) {
            this.getChannelData();
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

        return <ChannelRoute {...{pathname, params}}/>
    }
    
}

ChannelCheck.contextTypes = {
  router: React.PropTypes.object
};

ChannelCheck = connect(
    state => ({
        status: {
            valid: state.channel.valid,
            checking: state.channel.requests.checkInfo.fetching
        }
    }),
    dispatch => ({
        ChannelActions: bindActionCreators(channel, dispatch),
        UIActions: bindActionCreators({
            initialize,
            setFooterVisibility
        }, dispatch)
    })
)(ChannelCheck)

export default ChannelCheck;