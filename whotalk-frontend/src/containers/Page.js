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
        <div>
            Privacy
        </div>
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