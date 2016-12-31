import React, {Component} from 'react'

class StatusMessage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            closing: false,
            firstRender: true
        };

    }
    componentWillReceiveProps (nextProps) {
        if(!this.props.visible && nextProps.visible) {
            if(this.state.firstRender) {
                this.setState({
                    firstRender: false
                });
            }
        }

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
        const { children, visible, onShow, hide } = this.props;
        const { closing, firstRender } = this.state;

        if(hide) return null;

        // not visible and not closing -> do not render
        if(!visible && !closing) {
            if(firstRender) return null;
            return (
                <div className="fadeIn3 status-message-icon animated bounce" onClick={onShow}>
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