import React from 'react'

const RoundyRectangle = ({height, width, color, marginBottom = '10px', moreStyle}) => {
    const style = { 
        height,
        width,
        backgroundColor: color,
        borderRadius: height,
        marginBottom,
        opacity: '0.7',
        ...moreStyle
    };

    return (
        <div style={style}>
            
        </div>
    )
}

export default RoundyRectangle