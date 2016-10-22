import React from 'react';

const Info = () => {
    return (
        <div className="info ui grid">
            <div className="three column row">
                <div className="column">
                    <div className="title">TALKERS</div>
                    <div className="value">0</div>
                </div>
                <div className="column">
                    <div className="title">FOLLOWING</div>
                    <div className="value">0</div>
                </div>
                <div className="column">
                    <div className="title">FOLLOWERS</div>
                    <div className="value">0</div>
                </div>
            </div>
        </div>
    );
};

export default Info;