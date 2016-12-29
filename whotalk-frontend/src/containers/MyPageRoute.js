import React, {Component} from 'react'

import {MyPage} from 'components';
const Forms = MyPage.Forms;

import {Redirect, Match} from 'react-router';
import { connect } from 'react-redux';
import notify from 'helpers/notify';
import * as ui from 'actions/ui';
import * as form from 'actions/form';
import * as mypage from 'reducers/mypage';

import {bindActionCreators} from 'redux';

class MyPageRoute extends Component {

    componentDidMount () {
        const {UIActions, MyPageActions, FormActions} = this.props;
        UIActions.setHeaderTransparency(false);
        UIActions.setFooterSpace(true);
        UIActions.setFooterVisibility(true);
        FormActions.formReset();
    
             
        // thunk
        const getAccountSetting = async () => {
            await MyPageActions.getAccountSetting();
            const { email, givenName, familyName } = this.props.status.account;
            
            FormActions.changeInput({ form: 'accountSetting', name: 'email', value: email});
            FormActions.changeInput({ form: 'accountSetting', name: 'givenName', value: givenName});
            FormActions.changeInput({ form: 'accountSetting', name: 'familyName', value: familyName});
        }

        getAccountSetting();
    }

    changeInput = (form, e) => {
        const {FormActions} = this.props;
        FormActions.changeInput({form, name: e.target.name, value: e.target.value});
    }

    handleChange = {
        account: (e) => this.changeInput('accountSetting', e)
    }

    handleUpdate = {
        account: async (data) => {
            const {MyPageActions, UIActions, FormActions, ui} = this.props;
            
            const form = this.props.form.account;

            const validation = {
                givenName: {
                    regex: /^.{1,30}$/,
                    message: 'Check your givenName'
                },
                familyName: {
                    regex: /^.{1,30}$/,
                    message: 'Check your familyName'
                },
                email: {
                    regex: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
                    message: 'Invalid email'
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
                notify({type: 'success', message: 'Saved!'});
                if(ui.account.editPassword) {
                    UIActions.setEditPasswordVisibility(false);
                    FormActions.changeInput({ form: 'accountSetting', name: 'currentPassword', value: ''});
                    FormActions.changeInput({ form: 'accountSetting', name: 'password', value: ''});
                    FormActions.changeInput({ form: 'accountSetting', name: 'confirmPassword', value: ''});
                }
                FormActions.resetError('account');
            } catch (e) {
                const errors = {
                    0: 'Invalid Request',
                    1: 'Confirm Password does not match',
                    2: 'You\'ve input wrong password',
                    3: 'Your new password is to short',
                    4: 'That email exists'
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
        }
    }

    render () {
        const { UIActions, ui, form, formError, status } = this.props;
        const { handleChange, handleUpdate } = this;


        return (
            <MyPage.Wrapper>
                <MyPage.LeftBar/>
                <MyPage.Box>
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
                        loading={status.loadingAccount}
                        updating={status.updatingAccount}
                        error={formError['account']}
                    />
                </MyPage.Box>
            </MyPage.Wrapper>
        );
    }
}

MyPageRoute = connect(
    state => ({
        status: {
            account: state.mypage.account,
            loadingAccount: state.mypage.requests.getAccountSetting.fetching,
            updatingAccount: state.mypage.requests.updateAccountSetting.fetching
        },
        ui: {
            account: state.ui.myPage.account
        },
        form: {
            account: state.form.accountSetting
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

export default MyPageRoute;