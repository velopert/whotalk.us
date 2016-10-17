import React from 'react';
import {Link} from 'react-router';

const NotFound = () => {
    return (
        <div className="not-found">
            <div className="jello">
                <div className="number">
                    404
                </div>
                <div className="text">
                    UH OH, SOMETHING DIDN'T WORK
                </div>
                <Link to="/" className="ui inverted basic orange button">RETURN HOME</Link>
            </div>
        </div>
    );
};

export default NotFound;