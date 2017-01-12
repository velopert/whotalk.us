import React, {Component, PropTypes} from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router';
import { storage } from 'helpers';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

const propTypes = {
    like: PropTypes.bool
};

const defaultProps = {
    like: false
};

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            showLearnMore: false
        };
        this.timeoutId = {};
        this.session =  storage.get('session');
    }

    componentDidMount() {
        // trigger animation after 1.5 seconds
        this.timeoutId.t1 = setTimeout(() => {
            this.setState({ isLoaded: true });
            // then, fade in background
            this.timeoutId.t2 = setTimeout(() => {
                this.setState({ showLearnMore: true })
            }, 1000)
        }, 1000);

        storage.remove('redirect');


        // (function (d, s, id) {
        //     var js, fjs = d.getElementsByTagName(s)[0];
        //     if (d.getElementById(id)) return;
        //     js = d.createElement(s); js.id = id;
        //     js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.8&appId=664322480382395";
        //     fjs.parentNode.insertBefore(js, fjs);
        // } (document, 'script', 'facebook-jssdk'));
    }


    render() {

        const { logged, username, onOpenExplore } = this.props;

        const loaded = this.state.isLoaded ? 'loaded' : '';
        const animate = this.state.showLearnMore ? 'slide-up-and-down' : '';

        const notLogged = (
            <div>
                <Link to="/auth/register" className="ui inverted basic orange button"><FormattedMessage id="HomeScreen.createChannel"/></Link>
                <Link to="/auth" className="ui inverted basic green button"><FormattedMessage id="HomeScreen.logIn"/></Link>
            </div>
        );


        const isLogged = (
            <div>
                <Link to={"/" + username } className={`ui inverted basic orange button ${username===null?'disabled':''}`}>
                    <FormattedMessage id="HomeScreen.myChannel"/>
                </Link><button onClick={onOpenExplore} className="ui inverted basic green button">
                    <FormattedMessage id="HomeScreen.explore"/>
                </button>
            </div>
        );

        const buttons = logged || this.session.logged ? isLogged : notLogged;

        return (
            <div className="home-screen">
            
                <div className="space">
                    <div className="header-contents fadeIn">
                        <div className='logo-wrapper'>
                            <div className={`logo ${loaded}`}>
                                WHOTALK
                            </div>
                        </div>
                        <div className="site-info"><FormattedHTMLMessage id="HomeScreen.centerMessage"/></div>
                        <div className="button-container">
                            {buttons}
                        </div>
                    </div>


                    <iframe className={"like-button" + (this.props.like ? '' : ' hide') } src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Ffacebook.com%2Fwhotalkus&width=134&layout=button_count&action=like&size=small&show_faces=false&share=true&height=46&appId=664322480382395" width="152" height="46" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder="0" allowTransparency="true"></iframe>
                    {/*<div className="like-button fb-like" data-href="http://facebook.com/velopert" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="true"></div>*/}



                    <ScrollLink to="below-header" activeClass="active" spy={true} smooth={true} offset={-50} duration={1000}>
                        <div className="learn-more">
                            <div className={`wrapper ${animate}`}>
                                <div className="text"><FormattedMessage id="HomeScreen.more"/></div>
                                <i className="angle double down icon"></i>
                            </div>
                        </div>
                    </ScrollLink>
                </div>
            </div>
        );
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId.t1);
        clearTimeout(this.timeoutId.t2);
    }
    
}

//<iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Ffacebook.com%2Fwhotalkus&width=134&layout=button_count&action=like&size=small&show_faces=false&share=true&height=46&appId=664322480382395" width="134" height="46" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>


HomeScreen.propTypes = propTypes;
HomeScreen.defaultProps = defaultProps;

export default HomeScreen;