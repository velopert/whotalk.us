import React, { Component, PropTypes } from 'react';

const propTypes = {

};

const defaultProps = {

};

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="header">Header</div>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
