import React, {Component} from 'react';
import { connect } from 'react-redux';
import { checkUsername } from 'actions/auth';
import { bindActionCreators } from 'redux';

class Channel extends Component {
    
    async componentDidMount() {
        const { params, AuthActions } = this.props;
        await AuthActions.checkUsername(params);
        if(!this.props.status.valid) {
            this.context.router.transitionTo('/404')
        }
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
        AuthActions: bindActionCreators({
            checkUsername
        }, dispatch)
    })
)(Channel);

export default Channel;