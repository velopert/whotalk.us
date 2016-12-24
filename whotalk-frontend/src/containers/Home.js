import React, { Component } from 'react';
import {
    HomeScreen,
    InfoSection,
    MainSection,
    DevSection,
    PopOutEffect
} from 'components';
import { connect } from 'react-redux';


import unknown from 'assets/unknown.jpg';
import type from 'assets/type.jpg';
import hands from 'assets/hands.jpg';

import * as ui from 'actions/ui';
import {bindActionCreators} from 'redux';

import autobind from 'autobind-decorator';


class Home extends Component {

    componentDidMount() {
        const { UIActions } = this.props;
        UIActions.setFooterSpace(true);
        UIActions.setFooterVisibility(true);
        UIActions.setHeaderTransparency(true);
    }

    @autobind
    handleOpenExplore() {
        const { UIActions } = this.props;
        UIActions.setHeaderTransparency(false);
        UIActions.openExplore();
        setTimeout(
            () => {
                this.context.router.transitionTo('/explore');
            }, 700
        )
    }

    handleOpenDevChannel = () => {
        this.context.router.transitionTo('/velopert');
    }
    
    render() {

        const { status } = this.props;
        const { handleOpenExplore, handleOpenDevChannel } = this;

        return (
            <div className="home">
                { status.preAnimate ? <PopOutEffect/> : null }
                <HomeScreen 
                    like={status.likeVisibility}
                    logged={status.session.logged}
                    username={status.session.user.common_profile.username}
                    onOpenExplore={handleOpenExplore}
                />

                <MainSection onOpenDevChannel={handleOpenDevChannel}/>

                {/*<InfoSection
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
                />*/}

                

                
            </div>
        );
    }
}

Home.contextTypes = {
    router: React.PropTypes.object
};


Home = connect(
    state => ({
        status: {
            session: state.auth.session,
            likeVisibility: state.ui.home.like,
            preAnimate: state.ui.explore.preAnimate
        }
    }),
    dispatch => ({
        UIActions: bindActionCreators({
            setHeaderTransparency: ui.setHeaderTransparency,
            setFooterSpace: ui.setFooterSpace,
            setFooterVisibility: ui.setFooterVisibility,
            openExplore: ui.openExplore
        }, dispatch)
    })
)(Home)
export default Home;
