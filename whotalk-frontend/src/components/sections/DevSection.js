import React, { Component } from 'react';

class DevSection extends Component {

    render() {
        return (
            <div className="dev-section">
                <div className="text-side">
                    <h1>TALK TO DEVELOPER</h1>
                    <p>Do you have any suggestions or questions?</p>
                    <p>How about, talking to the developer?</p>
                </div>
                <div className="button-side">
                    <button className="ui inverted blue basic button">GO TO DEV CHANNEL</button>
                    <button className="ui inverted violet basic button">FREQUENTLY ASKED QUESTIONS</button>
                </div>
            </div>
        );
    }
}


export default DevSection;
