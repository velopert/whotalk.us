import React, {Component} from 'react'
import {Redirect, Match} from 'react-router';
import { connect } from 'react-redux';
import * as ui from 'actions/ui';
import {bindActionCreators} from 'redux';
import { StaticPage } from 'components';
import {FormattedHTMLMessage} from 'react-intl';

const Index = (props) => {
    return (
        <div>
            <Redirect to="/404"/>
        </div>
    );
}

const About = () => {
    return (
        <StaticPage title="About">
            <FormattedHTMLMessage
                id="Page.About"
                default={`<h1> Q. What is WhoTalk? </h1> <p> WhoTalk is a Chat-based SNS platform that allows other people to talk to you anonymously. In the other way around, you can talk to others anonymously. </p><h1> Q. How does it work? </h1> <p> As you get signed in, you will get your own channel. Share your channel URL to your friends (by using facebook, twitter, etc.). </p><h1> Q. Is there an mobile app for this? </h1> <p> We are currently working on it. We will let you know as soon as it is done. </p><h1> Q. How is anonymous username generated? </h1> <p> You will get a unique anonymous username per channel. We store your information in session. So, the anonymous username will remain the same even if you revisit the channel. </p><h1>WhoTalk is an opensource project</h1> <p> The source code of this project can be retrieved from <a href="https://github.com/velopert/whotalk.us/">GitHub repository</a>. Feel free to create a new issue for us. </p><h1>Contact Us</h1> <p> If you have anything to tell us, you can talk to us directly in <a href="/velopert">this channel</a>. </p><p> Or, you can drop us an email: <a href="mailto:admin@whotalk.us">admin@whotalk.us</a> </p>`}
            />
        </StaticPage>
    );
};

const Privacy = () => {
    return (
        <StaticPage title="Privacy Policy">
            <FormattedHTMLMessage
                id="Page.Privacy"
                default={`<p>Last updated: 24th December 2016</p><p><b>WhoTalk</b> ("us", "we", or "our") operates <a href="https://whotalk.us/">https://whotalk.us/</a> (the "Site"). This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site.</p><p> We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy. </p><h2> Information Collection And Use </h2> <p> While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name ("Personal Information"). </p><h2> Log Data </h2> <p> Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages and other statistics. In addition, we may use third party services such as Google Analytics that collect, monitor and analyze this. </p><h2> Communications </h2> <p> We may use your Personal Information to contact you with newsletters, marketing or promotional materials and other information </p><h2> Cookie </h2> <p> Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive. Like many sites, we use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site. </p><h2> Security </h2> <p> The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security. </p><h2> Changes To This Privacy Policy </h2> <p> This Privacy Policy is effective as of 24th December 2016 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page. We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy. If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our website. </p><h2> Contact Us </h2> <p> If you have any questions about this Privacy Policy, please contact us. </p><p> Email: <a href="mailto:admin@whotalk.us">admin@whotalk.us</a> </p>`}
            />

        </StaticPage>
    );
};

const Terms = () => {
    return (
        <StaticPage title="Terms of Use">
            <FormattedHTMLMessage
                id="Page.Terms"
                default={`<h1>1. Terms</h1><p>By accessing this web site, you are agreeing to be bound by these web site Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this web site are protected by applicable copyright and trade mark law.</p><h1>2. Use License</h1><ol type="a"><li>Permission is granted to temporarily download one copy of the materials (information or software) on WhoTalk's web site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:<ol type="i"><li>modify or copy the materials;</li><li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li><li>attempt to decompile or reverse engineer any software contained on WhoTalk's web site;</li><li>remove any copyright or other proprietary notations from the materials; or</li><li>transfer the materials to another person or "mirror" the materials on any other server.</li></ol></li><li>This license shall automatically terminate if you violate any of these restrictions and may be terminated by WhoTalk at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</li></ol><h1>3. Disclaimer</h1><ol type="a"><li>The materials on WhoTalk's web site are provided "as is". WhoTalk makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, WhoTalk does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet web site or otherwise relating to such materials or on any sites linked to this site.</li></ol><h1>4. Limitations</h1><p>In no event shall WhoTalk or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption,) arising out of the use or inability to use the materials on WhoTalk's Internet site, even if WhoTalk or a WhoTalk authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p><h1>5. Revisions and Errata</h1><p>The materials appearing on WhoTalk's web site could include technical, typographical, or photographic errors. WhoTalk does not warrant that any of the materials on its web site are accurate, complete, or current. WhoTalk may make changes to the materials contained on its web site at any time without notice. WhoTalk does not, however, make any commitment to update the materials.</p><h1> 6. Code of Conduct</h1><p> When you write anything on the Services, it can be seen or accessed by general public (not just registered members). You are responsible for everything you write on the services, and you are subject to the code of conduct.</p><p> When using the Services, you must not write anything which:</p><ul> <li> is bullying, harassing, or causing anybody to get upset; </li><li> is provoking or antagonizing people, or trolling; </li><li> is using rude words; </li><li> is encouraging dangerous or illegal activities; </li><li> is depicting horrible, shocking or distressing things; </li><li> is pornographic or depicts graphic violence; </li><li> is containing threat to any kind; </li><li> is illgal; </li><li> may cause any harm or damage to you or anyone else; </li><li> is a spam; </li></ul><p> We may access, preserve or disclose any of your information if we are required to do so by law, or if we believe in good faith that it is reasonably necessary.</p><h1>7. Links</h1><p>WhoTalk has not reviewed all of the sites linked to its Internet web site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by WhoTalk of the site. Use of any such linked web site is at the user's own risk.</p><h1>8. Site Terms of Use Modifications</h1><p>WhoTalk may revise these terms of use for its web site at any time without notice. By using this web site you are agreeing to be bound by the then current version of these Terms and Conditions of Use.</p><h1>9. Governing Law</h1><p>Any claim relating to WhoTalk's web site shall be governed by the laws of the Republic of Korea without regard to its conflict of law provisions.</p><p>General Terms and Conditions applicable to Use of a Web Site.</p>`}
            />
        </StaticPage>
    );
};

class Page extends Component {

    routes = ['about', 'privacy', 'terms']

    componentDidMount () {
        const {UIActions} = this.props;
        UIActions.setHeaderTransparency(false);
        UIActions.setFooterSpace(true);
        UIActions.setFooterVisibility(true);
        document.body.scrollTop = 0;
    }

    componentDidUpdate (prevProps, prevState) {
        if(prevProps.location.pathname !== this.props.location.pathname) {
            document.body.scrollTop = 0;
        }
    }
    
    

    render() {

        const {pathname, location} = this.props;

        const tokens = location.pathname.split('/');


        if(tokens[2]) {
            // page not found
            if(this.routes.indexOf(tokens[2])===-1) {
                return (
                    <Redirect to="/404"/>
                );
            }
        }


        return (
            <div>
               <Match exactly pattern={pathname} component={Index} location={location}/>
               <Match pattern={`${pathname}/about`} component={About} location={this.props.location}/>
               <Match pattern={`${pathname}/privacy`} component={Privacy} location={this.props.location}/>
               <Match pattern={`${pathname}/terms`} component={Terms} location={this.props.location}/>
            </div>
        );
    }
}

Page = connect(
    state => ({

    }),
    dispatch => ({
        UIActions: bindActionCreators({
            setHeaderTransparency: ui.setHeaderTransparency,
            setFooterSpace: ui.setFooterSpace,
            setFooterVisibility: ui.setFooterVisibility,
        }, dispatch)
    })
)(Page);

export default Page;