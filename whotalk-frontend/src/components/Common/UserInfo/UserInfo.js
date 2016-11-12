import React from 'react';
import Thumbnail from './Thumbnail';
import BasicInfo from './BasicInfo';
import Button from './Button';


const UserInfo = ({onFollow, username, givenName, familyName, thumbnail, following, hideButton, disabled}) => {
    return (
        <div className="user-info">
            <Thumbnail/>
            <BasicInfo
                username={username}
                name={`${givenName} ${familyName}`}
            />
            {!hideButton ? <Button following={following} onFollow={onFollow} disabled={disabled}/> : undefined}
            
        </div>
    );
};

export default UserInfo;