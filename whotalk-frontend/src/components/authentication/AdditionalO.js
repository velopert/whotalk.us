import React, {Component} from 'react';
import {Redirect} from 'react-router';

class AdditionalO extends Component {
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
        setTimeout(() => this.setState({leave: true}), 500)
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
                    className={"box animated bounceInRight " + (this.state.animate
                    ? 'bounceOutLeft'
                    : '')}>
                    <div className="title">YOU ARE ALMOST THERE!</div>
                    <div className="subtitle">TELL US YOUR USERNAME</div>
                    <div className="ui massive form">
                        <div className="field">
                            <label>USERNAME</label>
                            <div className="ui left icon input">
                                <input type="text" placeholder="Username"/>
                                <i className="user icon"></i>
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

export default AdditionalO;