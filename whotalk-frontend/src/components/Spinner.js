import React from 'react';

const style = {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
}

const Spinner = () => {
    return (
        <div style={style}>
            <div className="spinner">
                <div className="dot1"></div>
                <div className="dot2"></div>
            </div>
        </div>
    );
};

export default Spinner;