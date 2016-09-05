import React, { Component } from 'react';
import { 
    Header, 
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

    componentDidMount() {
        Events.scrollEvent.register('begin', function(to, element) {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function(to, element) {
            console.log("end", arguments);
        });

        scrollSpy.update();
    }


    render() {


        return (
            <div className="home">

                <Header mode={HeaderMode.HOME} />

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
