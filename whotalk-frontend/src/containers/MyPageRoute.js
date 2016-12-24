import React, {Component} from 'react'
import {MyPage} from 'components';

import {Redirect, Match} from 'react-router';
import { connect } from 'react-redux';
import * as ui from 'actions/ui';
import {bindActionCreators} from 'redux';

class MyPageRoute extends Component {

    componentDidMount () {
        const {UIActions} = this.props;
        UIActions.setHeaderTransparency(false);
    }
    

    render () {
        return (
            <MyPage.Wrapper>
                <MyPage.LeftBar/>
                <MyPage.Box/>
            </MyPage.Wrapper>
        );
    }
}

MyPageRoute = connect(
    state => ({

    }),
    dispatch => ({
        UIActions: bindActionCreators({
            setHeaderTransparency: ui.setHeaderTransparency
        }, dispatch)
    })
)(MyPageRoute);

export default MyPageRoute;