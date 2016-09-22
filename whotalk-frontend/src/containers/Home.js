import React, { Component } from 'react';
import {
    Header,
    HomeScreen,
    InfoSection,
    MainSection,
    DevSection,
    Footer
} from 'components';
import { HeaderMode } from 'components/Header';
import { Events, scrollSpy } from 'react-scroll';

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
        console.log(window.innerHeight - window.scrollY);

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

                <Header mode={HeaderMode.HOME} bar={this.state.showHeaderBar} search={true}/>

                <HomeScreen like={this.state.showLikeButton}/>

                <MainSection/>

                <InfoSection
                    image={unknown}
                    title="ANONYMOUS TALKS"
                    text={`STRANGERS CAN TALK TO YOU ANONYMOUSLY. \nTELL THEM TO ASK ANYTHING ABOUT YOU`}
                    inverted={false}
                />

                <InfoSection
                    image={type}
                    title="USER TALKS"
                    text={`YOU CAN SIGN IN AND TALK TO ANOTHER USERS USING YOUR USERNAME. \nYOU CAN STILL CHOOSE TO REMAIN ANONYMOUS WHILE SIGNED IN THOUGH.`}
                    inverted={true}
                />

                <InfoSection
                    image={hands}
                    title="FOLLOW"
                    text={`YOU CAN FOLLOW YOUR FAVORITE CHANNELS SO THAT YOU CAN VISIT THEM EASILY.`}
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

export default Home;
