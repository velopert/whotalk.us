import React, { Component  } from 'react';
import { Element } from 'react-scroll';
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';

class MainSection extends Component {


    constructor(props) {
        super(props);
        this.state = {
            animateWrapper1: false,
            animateWrapper2: false,
            animateWrapper3: false
        };
    }

    handleScroll = () => {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const pos = scrollTop +  window.innerHeight;

        if(pos > this.wrapper1.offsetTop - 100) {
            if(!this.state.animateWrapper1) {
                console.log(true);
                this.setState({
                    animateWrapper1: true
                })
            }
        } else {
            if(this.state.animateWrapper1) {
                console.log(false);
                this.setState({
                    animateWrapper1: false
                })
            }
        }




        if(pos > this.box.offsetTop - 60) {
            if(!this.state.animateWrapper2) {
                this.setState({
                    animateWrapper2: true
                })
            }
        } else {
            if(this.state.animateWrapper2) {
                this.setState({
                    animateWrapper2: false
                })
            }
        }


        if(pos > this.wrapper3.offsetTop - 60) {
            if(!this.state.animateWrapper3) {
                this.setState({
                    animateWrapper3: true
                });
                console.log(true);
            }
        } else {
            if(this.state.animateWrapper3) {
                this.setState({
                    animateWrapper3: false
                });
                console.log(false);
            }
        }
    }

    componentDidMount () {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    

    render() {
        const { animateWrapper1, animateWrapper2, animateWrapper3 } = this.state;

        const fadeInLeft = animateWrapper1 ? 'animated fadeInLeft' : '';
        const fadeInRight = animateWrapper1 ? 'animated fadeInRight' : '';

        const zoomIn = animateWrapper2 ? 'animated zoomIn' : '';

        const fadeInLeft2 = animateWrapper3 ? 'animated fadeInLeft' : '';
       
        const { onOpenDevChannel } = this.props;


        return(
            <Element name="below-header">
                <div className="main-section">
                    <div className="wrapper-1">
                        <div className="contents">
                            <div className={`text-title ${fadeInLeft}`} ref={ref=>this.wrapper1 = ref}>
                                <FormattedMessage
                                    id="MainSection.wrapper1.title"
                                    defaultMessage="WHOTALK IS A CHAT-BASED SNS PLATFORM"
                                />
                            </div>
                            <hr></hr>
                            <div className={`text-detail ${fadeInRight}`}>
                                <FormattedMessage
                                    id="MainSection.wrapper1.detail"
                                    defaultMessage="WE WILL BE THE KEY TO THE COMMUNICATION BETWEEN YOU AND PEOPLE AROUND THE WORLD"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="wrapper-2">
                        <div className="contents">
                            <div className="column left">
                                <div className={`box ${zoomIn}`} ref={ref=>this.box = ref}>
                                    <i className="spy icon circular inverted huge badge"></i>
                                    <div className="title">
                                        <FormattedMessage
                                            id="MainSection.wrapper2.anonymous"
                                            defaultMessage="ANONYMOUS TALKS"
                                        />
                                    </div>
                                    <div className="body">
                                        <FormattedMessage
                                            id="MainSection.wrapper2.anonymousBody"
                                            defaultMessage="Strangers can talk to you anonymously. Tell them to ask anything about you."
                                        /></div>
                                </div>
                            </div>
                            <div className="column center">
                                <div className={`box ${zoomIn}`}>
                                    <i className="user icon circular inverted huge badge"></i>
                                    <div className="title">
                                        <FormattedMessage
                                            id="MainSection.wrapper2.user"
                                            defaultMessage="USER TALKS"
                                        />
                                    </div>
                                    <div className="body">
                                        <FormattedMessage
                                            id="MainSection.wrapper2.userBody"
                                            defaultMessage="You can sign in and talk to another users using your username. You can still choose to remain anonymous while signed in though."
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="column right">
                                <div className={`box ${zoomIn}`}>
                                    <i className="rss icon circular inverted huge badge"></i>
                                    <div className="title">
                                        <FormattedMessage
                                            id="MainSection.wrapper2.follow"
                                            defaultMessage="FOLLOW"
                                        />
                                    </div>
                                    <div className="body">
                                        <FormattedMessage
                                            id="MainSection.wrapper2.followBody"
                                            defaultMessage="You can follow your favorite channels so that you can visit them easily."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wrapper-3">
                        <div className={`contents ${fadeInLeft2}`}>
                            <h1 ref={ref=>this.wrapper3 = ref}>
                                <FormattedMessage
                                    id="MainSection.wrapper3.title"
                                    defaultMessage="TALK TO DEVELOPER"
                                />
                            </h1>
                            <p>
                                <FormattedHTMLMessage
                                    id="MainSection.wrapper3.firstLine"
                                    defaultMessage="<b>WHOTALK</b> is currently in <i>beta</i>."
                                />
                            </p>
                            <p>
                                <FormattedHTMLMessage
                                    id="MainSection.wrapper3.secondLine"
                                    defaultMessage="Do you have any suggestions or questions?"
                                />
                            </p>
                            <p>
                                <FormattedHTMLMessage
                                    id="MainSection.wrapper3.thirdLine"
                                    defaultMessage="How about talking to the developer <b>DIRECTLY</b>?"
                                />
                            </p>

                            <button className="ui button massive inverted pink"
                                onClick={onOpenDevChannel}>
                                <i className="comment icon"></i>
                                    TALK
                            </button>
                        </div>
                        
                    </div>
                </div>
            </Element>
        );
    }
}

export default MainSection;
