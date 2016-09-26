import React, {Component} from 'react';
import {Match} from 'react-router';

import {Header, Login, Register, Additional, AdditionalO} from 'components';

const LoginRoute = () => {
    return (<Login/>)
}

const RegisterRoute = () => {
    return (<Register/>)
}

const AdditionalRoute = () => {
    return (<Additional/>)
}

const AdditionalORoute = () => {
    return (<AdditionalO/>)
}
// connect this component to redux

class Auth extends Component {
    render() {
        const {pathname} = this.props;

        return (
            <div>
                <Header/>
                <Match exactly pattern={pathname} component={LoginRoute}/>
                <Match pattern={`${pathname}/login`} component={LoginRoute}/>
                <Match exactly pattern={`${pathname}/register`} component={RegisterRoute}/>
                <Match pattern={`${pathname}/register/additional`} component={AdditionalRoute}/>
                <Match
                    pattern={`${pathname}/register/additional-o`}
                    component={AdditionalORoute}/>
            </div>
        );
    }
}

export default Auth;