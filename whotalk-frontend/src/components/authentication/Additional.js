import React, {Component} from 'react';
import {Redirect} from 'react-router';
import { AdditionalForm } from './forms';
import autobind from 'autobind-decorator';


class Additional extends Component {
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

    componentDidMount() {
        $('.dropdown').dropdown();
    }

    @autobind
    handleSelect(name, value) {
        const {FormActions} = this.props;
        FormActions.changeInput({form: 'additional', name, value})
    }

    @autobind
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

        const { handleSelect } = this;
        const { form } = this.props;


        return (
            <div className="additional">
                <div
                    className={"box bounceInRight " + (this.state.animate
                    ? 'bounceOutLeft'
                    : '')}>
                    <div className="title">YOU ARE ALMOST THERE!</div>
                    <div className="subtitle">PLEASE TELL US MORE ABOUT YOU</div>
                    <AdditionalForm form={form} onSelect={handleSelect}/>
                </div>

                {this.state.leave
                    ? redirect
                    : undefined}
            </div>
        );
    }
}

export default Additional;