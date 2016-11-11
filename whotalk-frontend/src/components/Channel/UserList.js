import React, {Component} from 'react';
import { UserInfo } from 'components/Common';


class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            round: true
        };
    }

    componentDidMount() {
        setTimeout(
            () => {
                this.setState({
                    round: false
                });
            }, 700
        );
    }
    
    render() {
        const { closing } = this.props;
        const { round } = this.state;

        return (
                <div className={`user-list popOut ${closing?'popIn':''}`}>
                    {closing || round ? null : (
                        <UserInfo/> 
                    )}
                </div>
        );
    }
}

export default UserList;