import React from 'react';

const Confirm = ({visible}) => {
    if(!visible) return null;

    return (
        <div className="confirm-clear fadeIn3">
            <div className="text">REALLY?</div>
            <button className="ui red button">YES</button>
            <button className="ui button">NO</button>
        </div>
    );

}

const Channel = ({onChange, onClear, onUpdate, statusMessage, loading, updating, confirmVisible, onSetConfirmClearVisibility}) => {
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
                    <div className="field">
                        <label>
                            CLEAR CHATTING LOG
                        </label>
                        <button className="ui red huge button" onClick={() => {
                            onSetConfirmClearVisibility(true)
                        }}>
                            CLEAR
                        </button>
                    </div>
                    <Confirm visible={confirmVisible} onClear={onClear}/>
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
    );
}

export default Channel;