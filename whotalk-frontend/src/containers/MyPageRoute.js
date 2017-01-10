import React, {Component} from 'react'

import {MyPage} from 'components';
import {storage} from 'helpers';

const Forms = MyPage.Forms;

import {Redirect, Match} from 'react-router';
import { connect } from 'react-redux';
import notify from 'helpers/notify';
import * as ui from 'actions/ui';
import * as form from 'actions/form';
import * as mypage from 'reducers/mypage';

import {bindActionCreators} from 'redux';

import { prepareMessages } from 'locale/helper';
import {injectIntl} from 'react-intl';

const messages = prepareMessages({
    "MyPage.notify.saved": "Saved!",
    "MyPage.notify.cleared": "Chatting log is cleared!",
    
    "MyPage.notify.givenName": "Check your given name",
    "MyPage.notify.familyName": "Check your family name",
    "MyPage.notify.email": "Invalid email",

    "MyPage.notify.invalidRequest": "Invalid Request",
    "MyPage.notify.cpMissMatch": "Confirm Password does not match",
    "MyPage.notify.wrongPassword": "You\'ve input wrong password",
    "MyPage.notify.passwordShort": "Your new password is too short",
    "MyPage.notify.emailExists": "That email exists"
});

class MyPageRoute extends Component {


    componentDidMount () {
        const {UIActions, MyPageActions, FormActions} = this.props;
        UIActions.setHeaderTransparency(false);
        UIActions.setFooterSpace(true);
        UIActions.setFooterVisibility(true);
        FormActions.formReset();
        MyPageActions.initialize();
    
             
        // thunk
        const getInitialSetting = async () => {
            await MyPageActions.getInitialSetting();
            const { email, givenName, familyName } = this.props.status.account;
            const { statusMessage } = this.props.status.channel;
            
            FormActions.changeInput({ form: 'accountSetting', name: 'email', value: email});
            FormActions.changeInput({ form: 'accountSetting', name: 'givenName', value: givenName});
            FormActions.changeInput({ form: 'accountSetting', name: 'familyName', value: familyName});
            
            FormActions.changeInput({ form: 'channelSetting', name: 'statusMessage', value: statusMessage})
        }

        getInitialSetting();
    }


    changeInput = (form, e) => {
        const {FormActions} = this.props;
        FormActions.changeInput({form, name: e.target.name, value: e.target.value});
    }

    handleChange = {
        account: (e) => this.changeInput('accountSetting', e),
        channel: (e) => this.changeInput('channelSetting', e)
    }

    handleUpdate = {
        account: async (data) => {
            const {MyPageActions, UIActions, FormActions, ui, intl: { formatMessage }} = this.props;

            
            const form = this.props.form.account;

            const validation = {
                givenName: {
                    regex: /^.{1,30}$/,
                    message: formatMessage(messages.givenName)
                },
                familyName: {
                    regex: /^.{1,30}$/,
                    message: formatMessage(messages.familyName)
                },
                email: {
                    regex: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
                    message: formatMessage(messages.email)
                }
            };
            

            let error = false;

            // regex Check
            const types = Object.keys(validation);

            // check for each types
            for(let type of types) {
                if(!validation[type].regex.test(form[type])) {
                    error = true;
                    FormActions.setInputError({
                        form: 'accountSetting', 
                        name: type,
                        error: true
                    });
                    notify({
                        type: 'error',
                        message: validation[type].message
                    });
                }
            }

            // check the password!
            if(form['password'] !== form['confirmPassword']) {
                FormActions.setInputError({
                    form: 'accountSetting', 
                    name: 'password',
                    error: true
                });
                FormActions.setInputError({
                    form: 'accountSetting', 
                    name: 'confirmPassword',
                    error: true
                });
                
                notify({type: 'error', message: 'Confirm Password does not match'});

                error = true; 
            }
        
            // if there is an error, stop at here
            if(error) return;
            
            try {
                await MyPageActions.updateAccountSetting(data);   
                location.href = "/mypage";
                notify({type: 'success', message: formatMessage(messages.saved)});
                if(ui.account.editPassword) {
                    UIActions.setEditPasswordVisibility(false);
                    FormActions.changeInput({ form: 'accountSetting', name: 'currentPassword', value: ''});
                    FormActions.changeInput({ form: 'accountSetting', name: 'password', value: ''});
                    FormActions.changeInput({ form: 'accountSetting', name: 'confirmPassword', value: ''});
                }
                FormActions.resetError('account');

            } catch (e) {
                const errors = {
                    0: formatMessage(messages.invalidRequest),
                    1: formatMessage(messages.cpMissMatch),
                    2: formatMessage(messages.wrongPassword),
                    3: formatMessage(messages.passwordShort),
                    4: formatMessage(messages.emailExists)
                }
                if(!e.response) return; 
                notify({type: 'error', message: errors[e.response.data.code]});
                if( e.response.data.code === 4 ) {
                    FormActions.setInputError({
                        form: 'accountSetting', 
                        name: 'email',
                        error: true
                    });
                }
            }
        },

        channel: async (data) => {
            const { MyPageActions, channel, status, intl: { formatMessage } } = this.props;
            const form = this.props.form.channel;


            const messageChanged= status.channel.statusMessage !== form.statusMessage;

            if(messageChanged) {
                await MyPageActions.updateChannelSetting({
                    message: form.statusMessage
                });
            }

            notify({type: 'success', message: formatMessage(messages.saved)});

        }
    }

    handleClear = async () => {
        const { MyPageActions, intl: { formatMessage } } = this.props;
        await MyPageActions.clearMessage();
        notify({type: 'success', message: formatMessage(messages.cleared)});
    }

    handleSetType = (type) => {
        const { MyPageActions } = this.props;
        MyPageActions.setSettingType(type);
    }

    handleSetConfirmClearVisibility = (visible) => {
        const { MyPageActions } = this.props;
        MyPageActions.setConfirmClearVisibility(visible);
    }

    handleSetUnregisterVisibility = (visible) => {
        const { MyPageActions } = this.props;
        MyPageActions.setUnregisterVisibility(visible);
    }

    handleUnregister = async () => {
        const { MyPageActions } = this.props;
        await MyPageActions.unregister();
        storage.set('session', { user: null, logged: false });
        window.location = '/';
    }

    handleSetEditThumbnailVisibility = (value) => {
        const { MyPageActions } = this.props;
        MyPageActions.setEditThumbnailVisibility(value);
    }

    handleDrop = (acceptedFiles, rejectedFiles) => {
        const { MyPageActions } = this.props;
        if(acceptedFiles.length === 0 ) return;
        MyPageActions.setFile(acceptedFiles[0]);
        console.log(acceptedFiles, rejectedFiles);
    }

    handleStoreImage = (dataUrl) => {
        const { MyPageActions } = this.props;
        MyPageActions.storeImage(dataUrl);
    }

    render () {
        const { UIActions, ui, form, formError, status } = this.props;
        const {
            handleChange,
            handleUpdate,
            handleSetType,
            handleClear,
            handleSetConfirmClearVisibility,
            handleSetUnregisterVisibility,
            handleUnregister,
            handleSetEditThumbnailVisibility,
            handleDrop,
            handleStoreImage
        } = this;

        let setting = null;

        switch(status.settingType) {
            case 'account':
                setting = (
                    <Forms.Account
                        type={status.account.type}
                        username={status.account.username}
                        email={form.account.email}
                        givenName={form.account.givenName}
                        familyName={form.account.familyName}
                        currentPassword={form.account.currentPassword}
                        password={form.account.password}
                        confirmPassword={form.account.confirmPassword}
                        editPassword={ui.account.editPassword}
                        onEditPasswordClick={()=>UIActions.setEditPasswordVisibility(true)}
                        onChange={handleChange['account']}
                        onUpdate={handleUpdate['account']}
                        loading={status.loadingInitialSetting}
                        updating={status.updatingAccount}
                        error={formError['account']}
                        editThumbnailVisibility={status.editThumbnailVisibility}
                        onSetEditThumbnailVisibility={handleSetEditThumbnailVisibility}
                        onDrop={handleDrop}
                        file={status.file}
                        image={status.image}
                        onStoreImage={handleStoreImage}
                    />
                );
                break;
            case 'channel':
                setting = (
                    <Forms.Channel
                        onChange={handleChange['channel']}
                        statusMessage={form.channel.statusMessage}
                        onUpdate={handleUpdate['channel']}
                        onSetConfirmClearVisibility={handleSetConfirmClearVisibility}
                        onClear={handleClear}
                        updating={status.updatingChannel}
                        clearing={status.clearingMessage}
                        confirmVisible={status.confirmClearVisibility}
                    />
                );
                break;
        }


        return (
            <MyPage.Wrapper>
                <MyPage.LeftBar
                    onSetType={handleSetType}
                    currentType={status.settingType}
                    onShowUnregister={()=>{handleSetUnregisterVisibility(true)}}
                />
                <MyPage.Box>
                    {setting}
                </MyPage.Box>
                <MyPage.Unregister
                    visible={status.unregisterVisibility}
                    onClose={()=>{handleSetUnregisterVisibility(false)}}
                    onUnregister={handleUnregister}
                />
            </MyPage.Wrapper>
        );
    }
}

MyPageRoute = connect(
    state => ({
        status: {
            settingType: state.mypage.type,
            account: state.mypage.account,
            channel: state.mypage.channel,
            confirmClearVisibility: state.mypage.confirmClearVisibility,
            unregisterVisibility: state.mypage.unregisterVisibility,
            editThumbnailVisibility: state.mypage.editThumbnailVisibility,
            loadingInitialSetting: state.mypage.requests.getInitialSetting.fetching,
            updatingAccount: state.mypage.requests.updateAccountSetting.fetching,
            updatingChannel: state.mypage.requests.updateChannelSetting.fetching,
            clearingMessage: state.mypage.requests.clearMessage.fetching,
            file: state.mypage.file,
            image: state.mypage.image
        },
        ui: {
            account: state.ui.myPage.account
        },
        form: {
            account: state.form.accountSetting,
            channel: state.form.channelSetting
        },
        formError: {
            account: state.form.error.accountSetting
        }
    }),
    dispatch => ({
        UIActions: bindActionCreators({
            setHeaderTransparency: ui.setHeaderTransparency,
            setFooterSpace: ui.setFooterSpace,
            setFooterVisibility: ui.setFooterVisibility,
            setEditPasswordVisibility: ui.setEditPasswordVisibility
        }, dispatch),
        FormActions: bindActionCreators(form, dispatch),
        MyPageActions: bindActionCreators(mypage, dispatch)
    })
)(MyPageRoute);

export default injectIntl(MyPageRoute);