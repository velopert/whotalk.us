import React, {Component} from 'react'

class StatusMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            closing: false
        };

    }
    componentWillReceiveProps (nextProps) {
        // visible is turning true -> false
        if(this.props.visible && !nextProps.visible) {
            this.setState({
                closing: true
            });

            // set closing to false after 300ms
            setTimeout(
                () => this.setState({closing: false}),
                300
            );
        }
    }
    

    render () {
        const { children, visible, onShow } = this.props;
        const { closing } = this.state;

        // not visible and not closing -> do not render
        if(!visible && !closing) {
            return (
                <div className="fadeIn3 status-message-icon" onClick={onShow}>
                    <i className="announcement icon"></i>
                </div>    
            );
        }

        // set the animation according to the visible value
        const animation = visible ? 'fadeInUp' : 'fadeOutDown';

        return (
            <div className={`status-message ${animation}`}>
                <i className="announcement icon"></i> {children}
            </div>
        );
    }
}

export default StatusMessage