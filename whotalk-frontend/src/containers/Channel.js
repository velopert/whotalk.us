import React, {Component} from 'react';

class Channel extends Component {
    
    componentDidMount() {
        
    }
    
    render() {
        const { params, pathname } = this.props;
        return (
            <div className="channel">
                { params.username } { pathname }
            </div>
        );
    }
}

export default Channel;