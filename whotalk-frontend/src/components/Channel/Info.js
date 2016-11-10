import React from 'react';
import { Common } from 'components';

const Info = ({channelInfo, onOpen}) => {
    return (
        <div className="info ui grid">
            <div className="three column row">
                <div className="column">
                    <div className="title">TALKERS</div>
                    <div className="value"><Common.Odometered value={channelInfo.talkers}/></div>
                </div>
                <div className="column">
                    <div className="title">FOLLOWING</div>
                    <div className="value"><Common.Odometered value={channelInfo.following}/></div>
                </div>
                <div className="column" onClick={()=>{onOpen('followers')}}>
                    <div className="title">FOLLOWERS</div>
                    <div className="value"><Common.Odometered value={channelInfo.followers}/></div>
                </div>
            </div>
        </div>
    );
};

export default Info;