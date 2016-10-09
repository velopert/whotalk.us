import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export const HeaderMode = {
    DEFAULT: 'DEFAULT',
    HOME: 'HOME',
    LOGIN: 'LOGIN'
}

const propTypes = {
    mode: PropTypes.oneOf(Object.keys(HeaderMode)),
    like: PropTypes.bool,
    bar: PropTypes.bool
};

const defaultProps = {
    mode: HeaderMode.DEFAULT,
    like: false,
    bar: false,
    search: false
};

class Header extends Component {
    render() {
        
        const search = (
            <div className="search-button">
                <div className="icon-wrapper">
                    <i className="search icon">
                    </i>
                </div>
            </div>
        )

        return (
            <div className="header">
                <div className="top">
                    <div className={"bar" + (this.props.bar ? ' show' : '') }>
                    </div>
                    <Link to="/" className="top-logo">WHOTALK</Link>
                    <div className="menu-icon"><i className="sidebar icon"></i></div>
                    {this.props.search ? search : ''}
                    
                    
                </div>
            </div>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
