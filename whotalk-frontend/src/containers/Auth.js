import React, {Component} from 'react';
import { Match } from 'react-router';

import { Header, Login, Register, MatchWithFade } from 'components';

const LoginRoute = () => {
    return (
        <Login/>
    )
}

const RegisterRoute = () => {
    return (
        <Register/>
    )
}

// connect this component to redux


class Auth extends Component {
    render() {
        const { pathname } = this.props;

        return (
            <div>
                <Header/>
                <Match exactly pattern={pathname} component={LoginRoute}/>
                <Match pattern={`${pathname}/login`} component={LoginRoute}/>
                <Match pattern={`${pathname}/register`} component={RegisterRoute}/>
            </div>
        );
    }
}

export default Auth;