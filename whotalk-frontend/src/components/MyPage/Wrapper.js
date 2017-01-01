import React from 'react';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';


const Wrapper = ({children}) => {
    return (
        <div className="my-page">
            <div className="title-bar">
                    <div><i className="setting icon huge spin"></i></div>
                    <div className="text"><FormattedMessage id="MyPage.Wrapper.mypage"/></div>
            </div>
            <div className="contents">
                <div className="ui container">
                    <div className="ui grid stackable">
                       {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wrapper