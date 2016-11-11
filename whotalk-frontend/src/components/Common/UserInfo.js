import React from 'react';
import Circle from 'components/Sidebar/Circle';

const UserInfo = () => {
    return (
        <div className="user-info">
            <Circle/>
            <div className="text">
                <div className="username">velopert</div>
                <div className="name">Minjun Kim</div>
            </div>
        </div>
    );
};

export default UserInfo;