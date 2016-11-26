import React from 'react';
import { Common } from 'components';



const LeftBox = ({children, fetching}) => {
    const mockData = (
        <div className="mock-data">
            <Common.RoundyRectangle
                width="100%"
                height="11px"
                color="#f1f3f5"
            />

            <Common.RoundyRectangle
                width="120px"
                height="11px"
                color="#ced4da"
            />

            <Common.RoundyRectangle
                width="80px"
                height="11px"
                color="#ced4da"
            />

            <Common.RoundyRectangle
                width="120px"
                height="11px"
                color="#ced4da"
            />

            <Common.RoundyRectangle
                width="100%"
                height="11px"
                color="#f1f3f5"
                moreStyle={{
                    marginTop: '30px'
                }}
            />

            <Common.RoundyRectangle
                width="120px"
                height="11px"
                color="#ced4da"
            />

            <Common.RoundyRectangle
                width="80px"
                height="11px"
                color="#ced4da"
            />

            <Common.RoundyRectangle
                width="120px"
                height="11px"
                color="#ced4da"
            />

        </div>
    );

    return (
        <div className="left-box">
            {fetching ? mockData : children}
        </div>
    );
};

export default LeftBox;