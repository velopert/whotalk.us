import React, { Component, PropTypes } from 'react';
import { HomeScreen } from 'components';

export const HeaderMode = {
    HOME: 'HOME'
}

const propTypes = {
    mode: PropTypes.oneOf(Object.keys(HeaderMode)),
    like: PropTypes.bool,
    bar: PropTypes.bool
};

const defaultProps = {
    mode: HeaderMode.MAIN,
    like: false,
    bar: false
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
        setTimeout(() => {
            this.setState({ loadBackground: true });
        }, 2000);
    }


    render() {
        const home = (
            <div>
                <HomeScreen/>
            </div>
        );

        const fade = this.state.loadBackground ? 'fade' : '';


        return (

            
            <div className="header">
                <div className="background">
                    <div className={`image ${fade}`}>a</div>
                </div>

                <div className="top">
                    <div className={"bar" + (this.props.bar ? ' show' : '') }>
                        <div className="top-logo">WHOTALK</div>
                    </div>
                    <div className="search-button">
                        <div className="icon-wrapper">
                            <i className="search icon">
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
