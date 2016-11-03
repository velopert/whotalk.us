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
            message: '',
            cooling: false,
            blocked: false
        };
    }

    @autobind
    sleep() {

        const p = new Promise((resolve, reject) => {
            if(!this.state.cooling) {
                resolve();
            } else {
                let check = () => {
                    if(this.state.cooling) {
                        // check every 25ms
                        setTimeout(check, 25);
                    } else {
                        resolve();
                    }
                };

                check();
            }
        });

        return p;
    }


    @autobind
    async handleSend() {
        const { onSend } = this.props;
        if (this.state.message==='' || this.props.controlled || this.state.blocked) return;

        const msg = this.state.message;

        this.setState({
            message: ''
        });

        if(this.state.cooling) {
            this.setState({
                blocked: true
            });
            await this.sleep();
            this.setState({
                blocked: false
            });
        };
        
        onSend(msg);

        this.setState({
            cooling: true
        });

        setTimeout(() => {
            this.setState({
                cooling: false
            });
        }, 100);
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