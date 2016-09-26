import React, {Component, PropTypes} from 'react';
import {Link, Redirect} from 'react-router';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            animate: false,
            leave: false,
            path: ''
        };
        this
            .leaveTo
            .bind(this);
    }

    leaveTo(path) {
        this.setState({animate: true, path});
        setTimeout(() => this.setState({leave: true}), 500)
    }

    render() {

        const redirect = (<Redirect
            to={{
            pathname: this.state.path,
            state: {
                from: this.props.location
            }
        }}/>);

        return (
            <div className="login">
                <div
                    className={"box bounceInRight " + (this.state.animate
                    ? 'bounceOutLeft'
                    : '')}>
                    <div className="local">
                        <p className="title">LOG IN WITH YOUR USERNAME</p>
                        <div className="ui massive form">
                            <div className="field">
                                <label>USERNAME</label>
                                <div className="ui left icon input">
                                    <input type="text" placeholder="Username"/>
                                    <i className="user icon"></i>
                                </div>
                            </div>
                            <div className="field">
                                <label>PASSWORD</label>
                                <div className="ui left icon input">
                                    <input type="password" placeholder="Password"/>
                                    <i className="lock icon"></i>
                                </div>
                            </div>
                            <button className="massive pink ui button">
                                LOG IN
                            </button>
                        </div>
                        <div className="login-footer">
                            <p>New Here?&nbsp;<a onClick={() => this.leaveTo('/auth/register')}>
                                    Create an account</a>
                            </p>
                            <p>
                                <Link to="/">* Forgot Password?</Link>
                            </p>
                        </div>
                    </div>

                    <div className="or">OR</div>
                    <div className="ui horizontal divider">
                        Or
                    </div>
                    <div className="social">
                        <p className="title">CLICK TO LOG IN WITH</p>
                        <div className="hide-on-mobile">
                            <button className="ui facebook oauth button massive">
                                <i className="facebook icon"></i>
                                Facebook
                            </button>

                            <button className="ui google plus oauth button massive">
                                <i className="google icon"></i>
                                Google
                            </button>
                        </div>
                        <div className="ui grid hide-on-desktop">
                            <div className="eight wide column">
                                <button className="ui facebook button icon massive">
                                    <i className="facebook icon"></i>
                                </button>
                            </div>
                            <div className="eight wide column">
                                <button className="ui google plus icon button massive">
                                    <i className="google icon"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.leave
                    ? redirect
                    : undefined}
            </div>
        );
    }
}

export default Login;