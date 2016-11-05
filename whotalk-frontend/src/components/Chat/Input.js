// import React from 'react';

// const Input = ({value, onChange, onKeyPress, onSend}) => {
//     return (
//         <div className="input">
//             <div className="message">
//                 <input type="text" value={value} name="message" placeholder="Write a message" onChange={onChange} onKeyPress={onKeyPress}/>
//             </div>
//             <div className="send-button">
//                 <button className="circular ui icon button pink" onClick={onSend}>
//                     <i className="icon send"></i>
//                 </button>
//             </div>
//         </div>
//     );
// };

import React, {Component} from 'react';
import autobind from 'autobind-decorator';

function sleep(ms) {
    const p = new Promise((resolve, reject) => {
        setTimeout(()=>{resolve();}, ms);
    });

    return p;
}

class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };

        this.input = null
    }

    @autobind
    handleSend() {
        const { onSend } = this.props;
        if (this.state.message==='' || this.props.controlled) return;

        onSend(this.state.message);

        this.setState({
            message: ''
        });

        this.input.focus();
    }

    @autobind
    handleChange(e) {
        this.setState({
            message: e.target.value
        });
    }

    @autobind
    handleKeyPress(e) {
        if (e.charCode === 13) {
            this.handleSend();
        }
    }

    render() {
        const { message } = this.state;
        const { controlled } = this.props;

        const {handleSend, handleChange, handleKeyPress} = this;

        return (
            <div className={`input ${controlled?'controlled':''}`}>
                <div className="message">
                    <input type="text" value={message} name="message" placeholder="Write a message" onChange={handleChange} onKeyPress={handleKeyPress} ref={(ref)=>{this.input = ref}}/>
                </div>
                <div className="send-button">
                    <button className="circular ui icon button pink" onClick={handleSend}>
                        <i className="icon send"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default Input;