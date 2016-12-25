import React from 'react'



const Box = ({children}) => {
    return (
         <div className="twelve wide column box-wrapper">
            <div className="box">
                {children}
            </div>
         </div>
    );
};

export default Box;