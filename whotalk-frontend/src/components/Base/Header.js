import React, { PropTypes} from 'react';
import {Link} from 'react-router';
import autobind from 'autobind-decorator';
import detectMobile from 'helpers/detect-mobile';

const propTypes = {
    transparency: PropTypes.bool
};

const defaultProps = {
    transparency: true
};

const Header = ({onSidebarToggle, transparency, onSearchBtnClick, disableSearchButton}) => {
    
    return (
            <div className="header">
                <div className="top" style={ detectMobile() ? { width: '100vw' } : { } }>
                    <div
                        className={`bar ${transparency ? '' : 'show'}`}></div>
                    <Link to="/" className="top-logo">WHOTALK</Link>
                    <div className="menu-button" onClick={onSidebarToggle}>
                        <div className="icon-wrapper">
                            <i className="sidebar icon"></i>
                        </div>
                    </div>

                    <div className="search-button" onClick={disableSearchButton ? undefined : onSearchBtnClick} >
                        <div className="icon-wrapper" >
                            <i className="search icon" ></i>
                        </div>
                    </div>

                </div>
            </div>
    );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
