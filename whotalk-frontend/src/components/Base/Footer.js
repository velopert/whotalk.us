import React, {Component} from 'react';

class Footer extends Component {
    render() {
        const { show, space } = this.props;

        return (
            <div>
                <div className={`footer-space ${space ? ' desktop' : ''}`}/>
                <div className="footer">
                    <ul>
                        <li><a>SELECT LANGUAGE</a></li>
                        <li><a>ABOUT</a></li>
                        <li><a>PRIVACY</a></li>
                        <li><a>TERMS</a></li>
                        <li className="right">© whotalk.us 2016</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Footer;