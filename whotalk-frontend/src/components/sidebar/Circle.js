import React from 'react';

const Circle = ({image}) => (
    <div className="circle">
        <div className="image"
        style={{
            background: `url(${image}) no-repeat`
        }}></div>
    </div>
);

Circle.defaultProps = {
    image: 'http://imgh.us/1472483328_user.svg'
};


export default Circle;
