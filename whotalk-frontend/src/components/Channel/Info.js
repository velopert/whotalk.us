import React from 'react';
import { Common } from 'components';

const Info = () => {
    return (
        <div className="info ui grid">
            <div className="three column row">
                <div className="column">
                    <div className="title">TALKERS</div>
                    <div className="value"><Common.Odometered value={44}/></div>
                </div>
                <div className="column">
                    <div className="title">FOLLOWING</div>
                    <div className="value"><Common.Odometered value={12}/></div>
                </div>
                <div className="column">
                    <div className="title">FOLLOWERS</div>
                    <div className="value"><Common.Odometered value={12}/></div>
                </div>
            </div>
        </div>
    );
};

export default Info;