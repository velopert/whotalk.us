import React, { Component } from 'react';
import Channel from './Channel';

class ChannelCheck extends Component {

    routes = {
        '/auth': true,
        '/404': true
    }
    
    render() {

        const { pathname } = this.props;

        // if params is one of the routes, show nothing.
        if(this.routes[pathname]) {
            return <div/>
        }



        // if (!) {
        //     return (<Channel {...props}/>);
        // } else {
        //     return (<div/>)
        // }
    }
}

ChannelCheck.contextTypes = {
  router: React.PropTypes.object
};

export default ChannelCheck;