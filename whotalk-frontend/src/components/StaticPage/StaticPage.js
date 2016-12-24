import React from 'react'
import Title from './Title';
import Contents from './Contents';

const StaticPage = ({title, children}) => {
    return (
        <div className="static-page">
            <Title text={title}/>
            <Contents>
                {children}
            </Contents>
        </div>
    );
}

export default StaticPage