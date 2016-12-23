import React, { Component  } from 'react';
import { Element } from 'react-scroll';
import {FormattedMessage} from 'react-intl';

class MainSection extends Component {

    render() {
        return(
            <Element name="below-header">
                <div className="main-section">
                    <div className="wrapper-1">
                        <span className="text-title">
                            <FormattedMessage
                                id="MainSection.wrapper1.title"
                                defaultMessage="WHOTALK IS A CHAT-BASED SNS PLATFORM"
                            />
                        </span>
                        <hr></hr>
                        <span className="text-detail">
                            <FormattedMessage
                                id="MainSection.wrapper1.detail"
                                defaultMessage="WE WILL BE THE KEY TO THE COMMUNICATION BETWEEN YOU AND PEOPLE AROUND THE WORLD"
                            />
                        </span>
                       {/*<div className="icon-container">
                            <span className="shield-shape red">
                                <i className="icon key"></i>
                            </span>

                            <span className="shield-shape asphalt">
                                <i className="icon comments outline"></i>
                            </span>
                            <span className="shield-shape purple">
                                <i className="icon users"></i>
                            </span>
                        </div>*/} 
                    </div>
                    <div className="wrapper-2">
                        <div className="column left">
                            <div className="box">
                                <i className="spy icon circular inverted huge badge"></i>
                                <div className="title">
                                    <FormattedMessage
                                        id="MainSection.wrapper2.anonymous"
                                        defaultMessage="ANONYMOUS TALKS"
                                    />
                                </div>
                                <div className="body"><FormattedMessage
                                        id="MainSection.wrapper2.anonymousBody"
                                        defaultMessage="Strangers can talk to you anonymously. Tell them to ask anything about you."
                                    /></div>
                            </div>
                        </div>
                        <div className="column center">
                            <div className="box">
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
                            <div className="box">
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
            </Element>
        );
    }
}

export default MainSection;
