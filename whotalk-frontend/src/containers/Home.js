import React, { Component } from 'react';
import {
    HomeScreen,
    InfoSection,
    MainSection,
    DevSection,
    Footer
} from 'components';
import { connect } from 'react-redux';


import unknown from 'assets/unknown.jpg';
import type from 'assets/type.jpg';
import hands from 'assets/hands.jpg';


class Home extends Component {
    render() {

        const { status } = this.props;
        return (
            <div className="home">
                <HomeScreen 
                    like={status.likeVisibility}
                    logged={status.session.logged}
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
}

Home = connect(
    state => ({
        status: {
            session: state.auth.session,
            likeVisibility: state.ui.home.like
        }
    })
)(Home)
export default Home;
