import React, {Component} from 'react'
import {Redirect, Match} from 'react-router';
import { connect } from 'react-redux';
import * as ui from 'actions/ui';
import {bindActionCreators} from 'redux';
import { StaticPage } from 'components';


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
            <h1>
                Q. What is WhoTalk?
            </h1>
            <p>
                WhoTalk is a Chat-based SNS platform that allows other people to talk to you anonymously. 
                In the other way around, you can talk to others anonymously.
            </p>

            <h1>
                Q. How does it work?
            </h1>
            <p>
                As you get signed in, you will get your own channel. Share your channel URL to your friends (by using facebook, twitter, etc.).
            </p>

            <h1>
                Q. Is there an mobile app for this?
            </h1>
            <p>
                We are currently working on it. We will let you know as soon as it is done.
            </p>

            <h1>
                Q. How is anonymous username generated? 
            </h1>
            <p>
                You will get a unique anonymous username per channel. We store your information in session. So, the anonymous username will remain the same even if you revisit the channel. 
            </p>

            <h1>WhoTalk is an opensource project</h1>
            <p>
                The source code of this project can be retrieved from <a href="https://github.com/velopert/whotalk.us/">GitHub repository</a>. Feel free to create a new issue for us.
            </p>

            <h1>Contact Us</h1>
            <p>
                If you have anything to tell us, you can talk to us directly in <a href="/velopert">this channel</a>. 
            </p>
            <p>
                Or, you can drop us an email: <a href="mailto:admin@whotalk.us">admin@whotalk.us</a>
            </p>
        </StaticPage>
    );
};

const Privacy = () => {
    return (
        <StaticPage title="Privacy Policy">
            <p>Last updated: 24th December 2016</p>
            <p><b>WhoTalk</b> ("us", "we", or "our") operates <a href="https://whotalk.us/">https://whotalk.us/</a> (the
                "Site"). This page informs you of our policies regarding the collection, use and disclosure of
                Personal Information we receive from users of the Site.</p>
            <p>
            We use your Personal Information only for providing and improving the Site. By using the Site, you
            agree to the collection and use of information in accordance with this policy.
            </p>
            
            <h2>
                Information Collection And Use
            </h2>
            <p>
            While using our Site, we may ask you to provide us with certain personally identifiable information
            that can be used to contact or identify you. Personally identifiable information may include, but is not
            limited to your name ("Personal Information").
            </p>

            <h2>
                Log Data
            </h2>
            <p>
                Like many site operators, we collect information that your browser sends whenever you visit our Site
                ("Log Data").
                This Log Data may include information such as your computer's Internet Protocol ("IP") address,
                browser type, browser version, the pages of our Site that you visit, the time and date of your visit,
                the time spent on those pages and other statistics.
                In addition, we may use third party services such as Google Analytics that collect, monitor and
                analyze this.
            </p>

            <h2>
                Communications
            </h2>

            <p>
                We may use your Personal Information to contact you with newsletters, marketing or promotional
                materials and other information
            </p>

            <h2>
                Cookie
            </h2>

            <p>
                Cookies are files with small amount of data, which may include an anonymous unique identifier.
                Cookies are sent to your browser from a web site and stored on your computer's hard drive.
                Like many sites, we use "cookies" to collect information. You can instruct your browser to refuse all
                cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may
                not be able to use some portions of our Site.
            </p>

            <h2>
                Security
            </h2>

            <p>
                The security of your Personal Information is important to us, but remember that no method of
                transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to
                use commercially acceptable means to protect your Personal Information, we cannot guarantee its
                absolute security.
            </p>

            <h2>
                Changes To This Privacy Policy
            </h2>

            <p>
            This Privacy Policy is effective as of 24th December 2016 and will remain in effect except with respect to any
            changes in its provisions in the future, which will be in effect immediately after being posted on this
            page.
            We reserve the right to update or change our Privacy Policy at any time and you should check this
            Privacy Policy periodically. Your continued use of the Service after we post any modifications to the
            Privacy Policy on this page will constitute your acknowledgment of the modifications and your
            consent to abide and be bound by the modified Privacy Policy.
            If we make any material changes to this Privacy Policy, we will notify you either through the email
            address you have provided us, or by placing a prominent notice on our website.
            </p>

            <h2>
                Contact Us
            </h2>
            <p>
                If you have any questions about this Privacy Policy, please contact us.
            </p>


        </StaticPage>
    );
};

const Terms = () => {
    return (
        <div>
            Terms
        </div>
    );
};

class Page extends Component {

    routes = ['about', 'privacy', 'terms']

    componentDidMount () {
        const {UIActions} = this.props;
        UIActions.setHeaderTransparency(false);
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
            setHeaderTransparency: ui.setHeaderTransparency
        }, dispatch)
    })
)(Page);

export default Page;