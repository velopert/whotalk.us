import React, { Component } from 'react';
import {
    HomeScreen,
    InfoSection,
    MainSection,
    DevSection,
    Footer
} from 'components';
import { Events, scrollSpy } from 'react-scroll';
import { connect } from 'react-redux';


import unknown from 'assets/unknown.jpg';
import type from 'assets/type.jpg';
import hands from 'assets/hands.jpg';


class Home extends Component {

    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            showLikeButton: true,
            showHeaderBar: false
        };
    }


    componentDidMount() {
        Events.scrollEvent.register('begin', function (to, element) {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function (to, element) {
            console.log("end", arguments);
        });

        scrollSpy.update();

        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll(e) {
        // console.log(window.scrollY);
        // console.log(window.innerHeight - window.scrollY);

        /* HIDE & SHOW FACEBOOK LIKE BUTTON */

        if (window.innerHeight - window.scrollY <= 100 && this.state.showLikeButton) {
            this.setState({
                showLikeButton: false
            });
        }

        if (window.innerHeight - window.scrollY > 100 && !this.state.showLikeButton) {
            this.setState({
                showLikeButton: true
            });
        }

        /* HIDE & SHOW HEADER BAR */
        if(window.innerHeight - window.scrollY <= 50 && !this.state.showHeaderBar) {
            this.setState({
                showHeaderBar: true
            });
        }

        /* HIDE & SHOW HEADER BAR */
        if(window.innerHeight - window.scrollY > 50 && this.state.showHeaderBar) {
            this.setState({
                showHeaderBar: false
            });
        }

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }



    render() {
        return (
            <div className="home">
                <HomeScreen 
                    like={this.state.showLikeButton}
                    logged={this.props.status.session.logged}
                />

                <MainSection/>

                <InfoSection
                    image={unknown}
                    title="ANONYMOUS TALKS"
                    text={`Strangers can talk to you anonymously. \nTell them to ask anything about you.`}
                    inverted={false}
                />

                <InfoSection
                    image={type}
                    title="USER TALKS"
                    text={`You can sign in and talk to another users using your username. \nYou can still choose to remain anonymous while signed in though.`}
                    inverted={true}
                />

                <InfoSection
                    image={hands}
                    title="FOLLOW"
                    text={`You can follow your favorite channels so that you can visit them easily.`}
                    inverted={false}
                />

                <DevSection/>

                <Footer/>
            </div>
        );
    }

    componentWillMount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }
}

Home = connect(
    state => ({
        status: {
            session: state.auth.session
        }
    })
)(Home)
export default Home;
