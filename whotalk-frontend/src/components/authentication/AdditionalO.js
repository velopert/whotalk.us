import React, {Component} from 'react';
import {Redirect} from 'react-router';
import { AdditionalOForm } from './forms';

import autobind from 'autobind-decorator';

class AdditionalO extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animate: false,
            leave: false,
            path: '',
            invert: false
        };
    }

    @autobind
    leaveTo(path, invert = false) {
        this.setState({animate: true, path, invert});
        setTimeout(() => this.setState({leave: true}), 700)
    }

    @autobind
    handleRegister(data) {
        console.log(data);
    }

    componentDidMount() {
        this.checkSession();
    }

    @autobind
    async checkSession() {
        await this.props.AuthActions.checkSession();
    }
    

    render() {
        const redirect = (<Redirect
            to={{
            pathname: this.state.path,
            state: {
                from: this.props.location
            }
        }}/>);

        const { handleRegister, leaveTo } = this;

        return (
            <div className="additional">
                <div
                    className={"box bounceInRight " + (this.state.animate
                    ? 'bounceOutLeft'
                    : '')}>
                    <div className="title">YOU ARE ALMOST THERE!</div>
                    <div className="subtitle">TELL US YOUR USERNAME</div>
                    <AdditionalOForm onSubmit={handleRegister}
                    onCancel={()=>this.leaveTo('/auth')}/>
                </div>

                {this.state.leave
                    ? redirect
                    : undefined}
            </div>
        );
    }
}

export default AdditionalO;