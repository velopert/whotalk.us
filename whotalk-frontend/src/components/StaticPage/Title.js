import React from 'react'

const Title = ({text}) => {
    return (
        <div className="title">

            <div className="ui container">
                {text}
            </div>

        </div>
    );
};

export default Title;