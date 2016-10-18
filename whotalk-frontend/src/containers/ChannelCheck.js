import React, { Component } from 'react';
import Channel from './Channel';
import { connect } from 'react-redux';
import { checkValidity } from 'actions/channel';
import { setFooterVisibility } from 'actions/ui';
import { bindActionCreators } from 'redux';
import { Spinner } from 'components';

class ChannelCheck extends Component {

    routes = {
        '/auth': true,
        '/404': true
    }

    async componentDidMount() {

        const { params, pathname, ChannelActions, UIActions } = this.props;

        
        

        if(this.routes[pathname]) {
            return;
        }

        UIActions.setFooterVisibility(false);
        
        await ChannelActions.checkValidity(params.username);
         UIActions.setFooterVisibility(true);
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
        }, dispatch),
        UIActions: bindActionCreators({
            setFooterVisibility
        }, dispatch)
    })
)(ChannelCheck)

export default ChannelCheck;