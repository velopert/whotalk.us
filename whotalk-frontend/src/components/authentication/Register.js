import React, {Component} from 'react';
import {Link, Redirect} from 'react-router';

class Register extends Component {

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
        setTimeout(() => this.setState({leave: true}), 700)
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
            <div className="register">
                <div
                    className={"box bounceInRight " + (this.state.animate
                    ? 'bounceOutLeft'
                    : '')}>
                    <div className="social">
                        <h2>SIGN UP WITH</h2>
                        <div className="ui grid">
                            <div className="eight wide column">
                                <button className="ui facebook button massive hide-on-mobile">
                                    <i className="facebook icon"></i>
                                    Facebook
                                </button>
                                <button className="ui facebook button icon massive hide-on-desktop">
                                    <i className="facebook icon"></i>
                                </button>
                            </div>
                            <div className="eight wide column">
                                <button className="ui google plus button massive hide-on-mobile">
                                    <i className="google icon"></i>
                                    Google
                                </button>
                                <button className="ui google plus icon button massive hide-on-desktop">
                                    <i className="google icon"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="divider">
                        OR
                    </div>
                    <div className="local">
                        <h2>SIGN UP WITH YOUR USERNAME</h2>
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
                            <div className="button-container">
                                <button
                                    onClick={() => this.leaveTo('/auth/register/additional')}
                                    className="massive pink ui button">
                                    NEXT
                                </button>
                            </div>
                            <div className="side-message">Already have an account?&nbsp;
                                <a onClick={() => this.leaveTo("/auth")}>Log In</a>
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

export default Register;