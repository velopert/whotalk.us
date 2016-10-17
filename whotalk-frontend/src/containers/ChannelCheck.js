import React from 'react';
import Channel from './Channel';

const routes = {
    '/auth': true,
    '/404': true
};

const ChannelCheck = (props) => {
    if (!routes[props.pathname]) {
        return (<Channel {...props}/>);
    } else {
        return (<div/>)
    }

};

export default ChannelCheck;