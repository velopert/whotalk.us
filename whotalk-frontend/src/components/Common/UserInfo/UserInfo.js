import React from 'react';
import Thumbnail from './Thumbnail';
import BasicInfo from './BasicInfo';
import Button from './Button';


const UserInfo = ({onFollow, username, givenName, familyName, thumbnail, following, logged, waiting}) => {
    return (
        <div className="user-info">
            <Thumbnail/>
            <BasicInfo
                username={username}
                name={`${givenName} ${familyName}`}
            />
            {logged ? <Button following={following} onFollow={onFollow} waiting={waiting}/> : undefined}
            
        </div>
    );
};

export default UserInfo;