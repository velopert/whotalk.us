import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {AdditionalForm} from './forms';
import autobind from 'autobind-decorator';
const toastr = window.toastr;

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
    async handleSubmit() {
        const { form, FormActions, AuthActions } = this.props;
        const { firstName, lastName, email, gender } = form;

        AuthActions.setSubmitStatus({name: 'additional', value: true});
        
        const validation = {
            firstName: {
                regex: /^[a-zA-Z]{1,30}$/,
                message: 'First name should not be empty'
            },
            lastName: {
                regex: /^[a-zA-Z]{1,30}$/,
                message: 'Last name should not be empty'
            },
            email: {
                regex: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
                message: 'Email is invalid'
            },
            gender: {
                regex: /(male|female)$/,
                message: 'Gender is not selected'
            }
        };

        const values = ['firstName', 'lastName', 'email', 'gender'];

        let error =false;

        for(let value of values) {
            if(!validation[value].regex.test(form[value])) {
                 toastr.error(validation[value].message);
                 FormActions.setInputError({form: 'additional', name: value, error: true});
                 error = true;
            } else {
                FormActions.setInputError({form: 'additional', name: value, error: false});
            }
        }

        if(!error) {
            const result = await AuthActions.checkEmail(form.email);
            if (result.action.payload.data.exists) {
                FormActions.setInputError({form: 'additional', name: 'email', error: true});
                toastr.error('Oops, that email already exists. You might already have an account!');
                error = true;
            } else {
                FormActions.setInputError({form: 'additional', name: 'email', error: false});
            }
        }


        if(error) {
            AuthActions.setSubmitStatus({name: 'additional', value: false});
            return;
        }

        

        AuthActions.setSubmitStatus({name: 'additional', value: false});
    }


    @autobind
    async handleBlur(e) {
        const { form, AuthActions, FormActions } = this.props;
        if(e.target.name==='email') {
            const result = await AuthActions.checkEmail(form.email);
            if (result.action.payload.data.exists) {
                FormActions.setInputError({form: 'additional', name: 'email', error: true});
                toastr.error('Oops, that email already exists. You might already have an account!');
            } else {
                FormActions.setInputError({form: 'additional', name: 'email', error: false});
            }
        }
    }

    @autobind
    handleChange(e) {
        const {FormActions} = this.props;
        FormActions.changeInput({form: 'additional', name: e.target.name, value: e.target.value})
    }

    render() {
        const redirect = (<Redirect
            to={{
            pathname: this.state.path,
            state: {
                from: this.props.location
            }
        }}/>);

        const {handleSelect, handleChange, handleSubmit, handleBlur} = this;
        const {form, formError, status} = this.props;

        return (
            <div className="additional">
                <div
                    className={"box bounceInRight " + (this.state.animate
                    ? 'bounceOutLeft'
                    : '')}>
                    <div className="title">YOU ARE ALMOST THERE!</div>
                    <div className="subtitle">PLEASE TELL US MORE ABOUT YOU</div>
                    <AdditionalForm 
                        form={form} 
                        onSelect={handleSelect} 
                        onChange={handleChange} 
                        onSubmit={handleSubmit} 
                        onBlur={handleBlur} 
                        error={formError} 
                        status={status}/>
                </div>

                {this.state.leave
                    ? redirect
                    : undefined}
            </div>
        );
    }
}

export default Additional;