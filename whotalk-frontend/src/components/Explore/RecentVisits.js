import React from 'react'
import { Link } from 'react-router';

const mapToLinks = (data) => {
    return data.map(
        (username, i) => (
            <div className="link" key={i}>
                <Link to={`/${username}`}>{username}</Link>
            </div>
        )
    )
}

const RecentVisits = ({data}) => {
    return (
        <div className="recent-visits">
            <div className="title">RECENTLY VISITED</div>
            <div className="links">
               { mapToLinks(data) }
            </div>
        </div>
    )
}

export default RecentVisits