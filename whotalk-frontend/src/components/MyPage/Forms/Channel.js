import React from 'react';

const Channel = ({onChange, onUpdate, statusMessage, loading, updating}) => {
    return (
        <div>
            <div className="top-bar">
                <p className="title">Channel</p>
                <p>Change your channel settings</p>
            </div>
            <div className={`body ${loading?'opacify':''}`}>
                <div className="ui form huge">
                    <div className="field">
                        <label>
                            STATUS MESSAGE
                        </label>
                        <input
                            name="statusMessage"
                            placeholder="Status Message"
                            onChange={onChange}
                            value={statusMessage}
                        />
                    </div>

                <div className="btn-container">
                    <button
                        className={`ui pink huge button ${updating?'loading':''}`}
                        onClick={onUpdate}
                    >
                        Save
                    </button>
                </div>
                
                </div>
            </div>
        </div>
    );
}

export default Channel;