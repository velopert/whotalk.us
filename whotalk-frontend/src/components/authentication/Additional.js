import React, {Component} from 'react';
import {Redirect} from 'react-router';
import { AdditionalForm } from './forms';

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
        this
            .handleRegister
            .bind(this);
    }


    leaveTo(path, invert = false) {
        this.setState({animate: true, path, invert});
        setTimeout(() => this.setState({leave: true}), 700)
    }

    componentDidMount() {
        $('.dropdown').dropdown();
    }

    handleRegister(data) {
        console.log(data);
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
                    <div className="subtitle">PLEASE TELL US MORE ABOUT YOU</div>
                    <AdditionalForm onSubmit={handleRegister}
                        onCancel={()=>this.leaveTo('/auth')}/>
                </div>

                {this.state.leave
                    ? redirect
                    : undefined}
            </div>
        );
    }
}

export default Additional;