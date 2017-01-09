import React from 'react';
import userThumbnail from 'assets/user.svg';

const Circle = ({image}) => (
    <div className="circle">
        <div className="image"
        style={{
            background: `url(${image==='none' ? userThumbnail : image}) 0% 0% / cover no-repeat`,
        }}></div>
    </div>
);

Circle.defaultProps = {
    image: userThumbnail
};


export default Circle;
