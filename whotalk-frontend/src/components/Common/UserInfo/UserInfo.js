import React from 'react';
import Thumbnail from './Thumbnail';
import BasicInfo from './BasicInfo';
import Button from './Button';


const UserInfo = ({onFollow, onUnfollow, username, givenName, familyName, thumbnail, following, hideButton, disabled}, context) => {
    return (
        <div className="user-info" onClick={(e)=>{
            if(e.target.classList.contains('button') || e.target.classList.contains('icon')) {
                return;
            } else {
                context.router.transitionTo('/' + username);
            }
        }}>
            <Thumbnail/>
            <BasicInfo
                username={username}
                name={
                    /[가-힣]$/.test(givenName)
                    ? familyName + ' ' + givenName
                    : givenName + ' ' + familyName
                }
            />
            {!hideButton ? <Button following={following} onClick={following ? onUnfollow : onFollow} disabled={disabled}/> : undefined}
            
        </div>
    );
};

UserInfo.contextTypes = {
  router: React.PropTypes.object
};

export default UserInfo;