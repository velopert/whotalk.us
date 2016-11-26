import React from 'react';
import { Common } from 'components';
import {Scrollbars} from 'react-custom-scrollbars';


const renderThumb = ({style, ...props}) => {
    const thumbStyle= {
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: '2px'
    };

    return (
        <div style={{...style, ...thumbStyle}}
            {...props}/>
    );
};

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
            <Scrollbars style={{height: '100%'}}
                renderThumbVertical={renderThumb}>
                {fetching ? mockData : children}
            </Scrollbars>
        </div>
    );
};

export default LeftBox;