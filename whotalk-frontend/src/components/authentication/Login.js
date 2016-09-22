import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';


class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="box fade-in">
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
                            <p>New Here? <Link to="/auth/register">Create an account</Link></p>
                            <p><Link to="/">* Forgot Password?</Link></p>
                        </div>
                    </div>

                    <div className="or">OR</div>
                    <div className="ui horizontal divider">
                        Or
                    </div>
                    <div className="social">
                        <p className="title">CLICK TO LOG IN WITH</p>
                        <button className="ui facebook oauth button massive">
                            <i className="facebook icon"></i>
                            Facebook
                        </button>

                        <button className="ui google plus oauth button massive">
                            <i className="google icon"></i>
                            Google
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


export default Login;