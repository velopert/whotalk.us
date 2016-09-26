import React, {Component} from 'react';
import {Redirect} from 'react-router';

class Additional extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animate: false,
            leave: false,
            path: '',
            invert: false
        };
        this
            .leaveTo
            .bind(this);
    }

    leaveTo(path, invert = false) {
        this.setState({animate: true, path, invert});
        setTimeout(() => this.setState({leave: true}), 700)
    }

    componentDidMount() {
        $('.dropdown').dropdown();
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
            <div className="additional">
                <div
                    className={"box bounceInRight " + (this.state.animate
                    ? 'bounceOutLeft'
                    : '')}>
                    <div className="title">YOU ARE ALMOST THERE!</div>
                    <div className="subtitle">PLEASE TELL US MORE ABOUT YOU</div>
                    <div className="ui massive form">
                        <div className="field">
                            <label>NAME</label>
                            <div className="two fields">
                                <div className="field">
                                    <input type="text" placeholder="First Name"/>
                                </div>
                                <div className="field last-name">
                                    <input type="text" placeholder="Last Name"/>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label>EMAIL</label>
                            <div className="ui left icon input">
                                <input type="text" placeholder="Email"/>
                                <i className="mail icon"></i>
                            </div>
                        </div>
                        <div className="field">
                            <label>GENDER</label>
                            <div className="ui selection dropdown">
                                <input type="hidden" name="gender"/>
                                <i className="dropdown icon"></i>
                                <div className="default text">Gender</div>
                                <div className="menu">
                                    <div className="item" data-value="1">Male</div>
                                    <div className="item" data-value="0">Female</div>
                                </div>
                            </div>
                        </div>
                        <div className="ui grid">
                            <div className="six wide column">
                                <button className="massive ui button" onClick={() => this.leaveTo('/auth')}>
                                    CANCEL
                                </button>
                            </div>
                            <div className="ten wide column">
                                <button className="massive pink ui button" onClick={() => this.leaveTo('/')}>
                                    SIGN UP
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

export default Additional;