import React, { Component, PropTypes } from 'react';
import { Link as ScrollLink } from 'react-scroll';

export const HeaderMode = {
    HOME: 'HOME'
}

const propTypes = {
    mode: PropTypes.oneOf(Object.keys(HeaderMode))
};

const defaultProps = {
    mode: HeaderMode.MAIN
};

class Header extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            loadBackground: false,
            showLearnMore: false
        };
    }

    componentDidMount() {
        // trigger animation after 1.5 seconds
        setTimeout(()=>{
            this.setState({isLoaded: true});
            // then, fade in background
            setTimeout(() => {
                this.setState({loadBackground: true});
                setTimeout(() => {
                    this.setState({showLearnMore: true})
                }, 1000)
            }, 500)
        }, 1000);
    }

    render() {

        const loaded = this.state.isLoaded ? 'loaded': '';
        const fade = this.state.loadBackground ? 'fade' : '';
        const animate = this.state.showLearnMore ? 'slide-up-and-down' : '';


        const background = (
            <div>
                <div className="background">
                    <div className={`image ${fade}`}>a</div>
                </div>

                <div className="space">
                    <div className="header-contents">
                        <div className='logo-wrapper'>
                            <div className={`logo ${loaded}`}>
                                WHOTALK
                            </div>
                        </div>
                        <div className="site-info"><b>ANYONE</b> CAN TALK TO YOU.</div>
                        <div className="button-container">
                            <button className="ui inverted basic orange button">CREATE YOUR CHANNEL</button><button className="ui inverted basic greendigi button">SIGN IN</button>
                        </div>
                </div>

                <iframe className="like-button" src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fvelopert%2F&width=187&layout=button_count&action=like&size=small&show_faces=true&share=true&height=46&appId=664322480382395" width="152" height="46" style={{border: 'none', overflow: 'hidden'}} scrolling="no" frameBorder="0" allowTransparency="true"></iframe>
                

                    <ScrollLink to="below-header" activeClass="active" spy={true} smooth={true} offset={1} duration={1000}>
                        <div className="learn-more">
                            <div className={`wrapper ${animate}`}>
                                <div className="text">MORE</div>
                                <i className="angle double down icon"></i>
                            </div>
                        </div>
                    </ScrollLink>
                </div>
            </div>
        );

        return(
            <div className="header">
                { this.props.mode === HeaderMode.HOME ? background : undefined }
            </div>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
