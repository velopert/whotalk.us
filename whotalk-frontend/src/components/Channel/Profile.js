import React from 'react';

const Profile = ({username, channelInfo}) => {
    return (
        <div className="profile">
            <div className="username">
                @{username}
            </div>
            <div className="name">
                {channelInfo.givenName} {channelInfo.familyName}
            </div>
        </div>
    );
};

export default Profile;