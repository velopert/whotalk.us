import React from 'react';
import userThumbnail from 'assets/user.png';


const Thumbnail = ({image}) => {
    return (
        <div className="thumbnail">
            <div className="circle">
                <div
                    className="image"
                    style={{
                    background: `url(${image}) no-repeat`,
                    backgroundSize: 'cover'
                }}></div>

            </div>
        </div>
    );
};

Thumbnail.defaultProps = {
    image: userThumbnail
};

export default Thumbnail;
