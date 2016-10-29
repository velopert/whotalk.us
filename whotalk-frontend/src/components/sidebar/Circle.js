import React from 'react';
import userThumbnail from 'assets/user.png';

const Circle = ({image}) => (
    <div className="circle">
        <div className="image"
        style={{
            background: `url(${image}) no-repeat`,
            backgroundSize: 'cover'
        }}></div>
    </div>
);

Circle.defaultProps = {
    image: userThumbnail
};


export default Circle;
