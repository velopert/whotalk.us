import React, {Component} from 'react';
import { Link } from 'react-router';



class Footer extends Component {
    render() {
        const { show, space, onLanguageClick } = this.props;

        return (
            <div>
                <div className={`footer-space ${space ? ' desktop' : ''}`}/>
                <div className="footer">
                    <ul>
                        <li><a onClick={onLanguageClick}>SELECT LANGUAGE</a></li>
                        <li><Link to="/page/about">ABOUT</Link></li>
                        <li><Link to="/page/privacy">PRIVACY</Link></li>
                        <li><Link to="/page/terms">TERM</Link></li>
                        <li className="right">© whotalk.us 2017</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Footer;