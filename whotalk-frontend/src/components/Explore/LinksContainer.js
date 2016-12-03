import React from 'react'
import { Link } from 'react-router';

import {FormattedMessage} from 'react-intl';

const mapToLinks = (data) => {
    return data.map(
        (username, i) => (
            <div className="link" key={i}>
                <Link to={`/${username}`}><span className="hashtag">#</span> {username}</Link>
            </div>
        )
    )
}

const LinksContainer = ({title,data}) => {
    return (
        <div className="fadeIn7 links-container">
            <div className="title">{title}</div>
                { data.length === 0 && (
                    <div className="empty">
                        <div><i className="large help circle icon"></i></div>
                        <span><FormattedMessage 
                            id="LinksContainer.empty" 
                            defaultMessage="List is empty"/>
                        </span>
                    </div> 
                )}
            <div className="links">
               { mapToLinks(data) }
            </div>
        </div>
    )
}

export default LinksContainer