import React, {Component} from 'react';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <ul>
                    <li><a>SELECT LANGUAGE</a></li>
                    <li><a>ABOUT</a></li>
                    <li><a>PRIVACY</a></li>
                    <li><a>TERMS</a></li>
                    <li className="right">© whotalk.us 2016</li>
                </ul>
            </div>
        );
    }
}

export default Footer;