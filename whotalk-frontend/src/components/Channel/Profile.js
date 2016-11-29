import React from 'react';

const Profile = ({username, channelInfo}) => {
    return (
        <div className="profile">
            <div className="username">
                @{username}
            </div>
            <div className="name">
                {/[가-힣]$/.test(channelInfo.givenName) ? channelInfo.familyName : channelInfo.givenName }
                &nbsp;
                {/[가-힣]$/.test(channelInfo.givenName) ? channelInfo.givenName : channelInfo.familyName }
            </div>
        </div>
    );
};

export default Profile;