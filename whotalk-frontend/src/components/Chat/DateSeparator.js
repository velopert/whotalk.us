import React from 'react';

const DateSeparator = ({date}) => {

    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formatted = date.toLocaleDateString([], dateOptions);

    return (
        <div className="date-separator">
            <div className="line">
                <div className="strike">
                    <span>{formatted}</span>
                </div>
            </div>
        </div>
    );
};

export default DateSeparator;