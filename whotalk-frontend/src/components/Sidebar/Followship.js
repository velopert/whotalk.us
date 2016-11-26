import React from 'react';
import { Common } from 'components';


const Followship = ({followers, following}) => (
    <div className="followship">
        <div className="ui grid">
            <div className="eight wide column">
                <div className="title">FOLLOWING</div>
                <div className="value">
                    <Common.Odometered value={following}/>
                </div>
            </div>
            <div className="eight wide column">
                <div className="title">FOLLOWER</div>
                <div className="value">
                    <Common.Odometered value={followers}/>
                </div>
            </div>
        </div>
    </div>
)

export default Followship;