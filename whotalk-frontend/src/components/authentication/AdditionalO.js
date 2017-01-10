import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {AdditionalOForm} from './forms';
import {injectIntl, defineMessages} from 'react-intl';

import autobind from 'autobind-decorator';
import notify from 'helpers/notify';
import { prepareMessages } from 'locale/helper';
import storage from 'helpers/storage';

const messages = prepareMessages({
    "AdditionalO.almostThere": "거의 다 끝났습니다!",
    "AdditionalO.tellUs": "아이디를 정해주세요",
    "AdditionalO.notify.invalidId": "유효하지 않은 Social ID입니다",
    "AdditionalO.notify.alreadySigned": "이미 가입하셨습니다",
    "AdditionalO.notify.usernameFormat": "비밀번호의 길이는 5~30 사이여야 합니다",
    "AdditionalO.notify.usernameDuplicated": "이미 사용중인 아이디입니다",
    "AdditionalO.notify.greeting": "안녕하세요, {name}님!"
})


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
        //console.log(data);
    }

    componentDidMount() {
        this.checkSession();
    }

    @autobind
    async checkSession() {
        const { intl: {
                formatMessage
            }} = this.props;

        await this
            .props
            .AuthActions
            .checkSession();

        if (!this.props.status.session.user) {
            // INVALID REQUEST
            this.leaveTo('/auth');
            notify({type: 'error', message: formatMessage(messages.invalidId)});
            return;
        }

        if (this.props.status.session.logged) {
            // already has a username
            this.leaveTo('/');
            // toastr.warning('You already have signed in'); toastr.success(`Hello,
            // ${this.props.status.session.user.common_profile.givenName}!`);
            notify({type: 'warning', message: formatMessage(messages.alreadySigned)});
            notify({type: 'success', message: formatMessage(messages.greeting, {name: this.props.status.session.user.common_profile.givenName})})
            return;
        }
    }

    @autobind
    handleChange(e) {
        const {FormActions} = this.props;
        FormActions.changeInput({form: 'additional_o', name: e.target.name, value: e.target.value})
    }

    @autobind
    async handleSubmit() {
        const {form, AuthActions, intl: {
                formatMessage
            }} = this.props;

        const regex = /^[0-9a-z_]{4,20}$/

        notify.clear();

        // check regex
        if (!regex.test(form.username)) {
            notify({type: 'error', message: formatMessage(messages.usernameFormat)});
            return;
        }

        AuthActions.setSubmitStatus({name: 'additional_o', value: true});

        // check username
        await AuthActions.checkUsername(form.username);

        if (this.props.status.usernameExists) {
            // toastr.error('That username is already taken, please try another one.');
            notify({type: 'error', message: formatMessage(messages.usernameDuplicated)});
            AuthActions.setSubmitStatus({name: 'register', value: false});
            return;
        }

        try {
            await AuthActions.oauthRegister({username: form.username});
        } catch (e) {
            // toastr.error('Oops, server rejected your request (' + e.response.data.message
            // + ')');
            notify({
                type: 'error',
                message: 'Oops, server rejected your request (' + e.response.data.message + ')'
            })
            AuthActions.setSubmitStatus({name: 'additional', value: false});
            this.leaveTo('/auth');
            return;
        }

        // do session check one more time
        await this
            .props
            .AuthActions
            .checkSession();

        AuthActions.setSubmitStatus({name: 'additional_o', value: false});
        // toastr.success(`Hello,
        // ${this.props.status.session.user.common_profile.givenName}!`)
        notify({type: 'success', message: formatMessage(messages.greeting, {name: this.props.status.session.user.common_profile.givenName})});
        
        storage.set('session', this.props.status.session);
        this.leaveTo('/');
    }

    @autobind
    handleKeyPress(e) {
        if (e.charCode === 13) {
            this.handleSubmit();
        }
    }

    render() {
        const redirect = (<Redirect
            to={{
            pathname: this.state.path,
            state: {
                from: this.props.location
            }
        }}/>);

        const {handleChange, handleSubmit, handleKeyPress, leaveTo} = this;
        const {form, status, intl: {
                formatMessage
            }} = this.props;

        return (
            <div className="additional">
                <div
                    className={"box bounceInRight " + (this.state.animate
                    ? 'bounceOutLeft'
                    : '')}>
                    <div className="title">{formatMessage(messages.almostThere)}</div>
                    <div className="subtitle">{formatMessage(messages.tellUs)}</div>
                    <AdditionalOForm
                        form={form}
                        status={status}
                        onChange={handleChange}
                        onCancel={() => leaveTo('/auth')}
                        onKeyPress={handleKeyPress}
                        onSubmit={handleSubmit}/>
                </div>

                {this.state.leave
                    ? redirect
                    : undefined}
            </div>
        );
    }
}

export default injectIntl(AdditionalO);