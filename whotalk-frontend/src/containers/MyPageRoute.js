import React, {Component} from 'react'

import {MyPage} from 'components';
const Forms = MyPage.Forms;

import {Redirect, Match} from 'react-router';
import { connect } from 'react-redux';
import * as ui from 'actions/ui';
import * as form from 'actions/form';


import {bindActionCreators} from 'redux';

class MyPageRoute extends Component {

    componentDidMount () {
        const {UIActions} = this.props;
        UIActions.setHeaderTransparency(false);
        UIActions.setFooterSpace(true);
        UIActions.setFooterVisibility(true);
    }
    
    changeInput = (form, e) => {
        const {FormActions} = this.props;
        FormActions.changeInput({form, name: e.target.name, value: e.target.value});
    }

    handleChange = {
        account: (e) => this.changeInput('accountSetting', e)
    }

    render () {
        const { UIActions, ui, form } = this.props;
        const { handleChange } = this;


        return (
            <MyPage.Wrapper>
                <MyPage.LeftBar/>
                <MyPage.Box>
                    <Forms.Account
                        username="velopert"
                        email={form.account.email}
                        givenName={form.account.givenName}
                        familyName={form.account.familyName}
                        password={form.account.password}
                        confirmPassword={form.account.confirmPassword}
                        editPassword={ui.account.editPassword}
                        onEditPasswordClick={UIActions.showEditPassword}
                        onChange={handleChange['account']}
                    />
                </MyPage.Box>
            </MyPage.Wrapper>
        );
    }
}

MyPageRoute = connect(
    state => ({
        ui: {
            account: state.ui.myPage.account
        },
        form: {
            account: state.form.accountSetting
        }
    }),
    dispatch => ({
        UIActions: bindActionCreators({
            setHeaderTransparency: ui.setHeaderTransparency,
            setFooterSpace: ui.setFooterSpace,
            setFooterVisibility: ui.setFooterVisibility,
            showEditPassword: ui.showEditPassword
        }, dispatch),
        FormActions: bindActionCreators(form, dispatch)
    })
)(MyPageRoute);

export default MyPageRoute;