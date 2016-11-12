import React from 'react';
import Thumbnail from './Thumbnail';
import BasicInfo from './BasicInfo';
import Button from './Button';


const UserInfo = ({onFollow, onUnfollow, username, givenName, familyName, thumbnail, following, hideButton, disabled}) => {
    return (
        <div className="user-info">
            <Thumbnail/>
            <BasicInfo
                username={username}
                name={`${givenName} ${familyName}`}
            />
            {!hideButton ? <Button following={following} onClick={following ? onUnfollow : onFollow} disabled={disabled}/> : undefined}
            
        </div>
    );
};

export default UserInfo;