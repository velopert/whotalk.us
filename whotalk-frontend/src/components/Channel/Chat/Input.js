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

class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    @autobind
    handleSend() {
        const { onSend } = this.props;
        if (this.state.message==='') return;

        onSend(this.state.message);
        this.setState({
            message: ''
        })
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

        const {handleSend, handleChange, handleKeyPress} = this;

        return (
            <div className="input">
                <div className="message">
                    <input type="text" value={message} name="message" placeholder="Write a message" onChange={handleChange} onKeyPress={handleKeyPress}/>
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