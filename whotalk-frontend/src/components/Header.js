import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import autobind from 'autobind-decorator';

const propTypes = {
    like: PropTypes.bool,
    transparency: PropTypes.bool
};

const defaultProps = {
    like: false,
    transparency: true,
    search: false
};

class Header extends Component {
    render() {

        const search = (
            <div className="search-button">
                <div className="icon-wrapper">
                    <i className="search icon"></i>
                </div>
            </div>
        )

        const { transparency } = this.props;


        return (
            <div className="header">
                <div className="top">
                    <div
                        className={`bar ${transparency ? '' : 'show'}`}></div>
                    <Link to="/" className="top-logo">WHOTALK</Link>
                    <div className="menu-button">
                        <div className="icon-wrapper">
                            <i className="sidebar icon"></i>
                        </div>
                    </div>

                    {this.props.search
                        ? search
                        : ''}

                </div>
            </div>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
