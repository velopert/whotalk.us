import React from 'react';
import Thumbnail from './Thumbnail';
import BasicInfo from './BasicInfo';
import Button from './Button';


const UserInfo = ({username, givenName, familyName, thumbnail}) => {
    return (
        <div className="user-info">
            <Thumbnail/>
            <BasicInfo
                username={username}
                name={`${givenName} ${familyName}`}
            />
            <Button/>
        </div>
    );
};

export default UserInfo;