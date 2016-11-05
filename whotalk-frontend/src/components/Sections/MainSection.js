import React, { Component  } from 'react';
import { Element } from 'react-scroll';

class MainSection extends Component {

    render() {
        return(
            <Element name="below-header">
                <div className="main-section">
                    <div className="wrapper">
                        <span className="text-title">WHOTALK IS A CHAT-BASED SNS PLATFORM</span>
                        <hr></hr>
                        <span className="text-detail">WE WILL BE THE KEY TO THE COMMUNICATION BETWEEN YOU AND PEOPLE AROUND THE WORLD</span>
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
                </div>
            </Element>
        );
    }
}

export default MainSection;
