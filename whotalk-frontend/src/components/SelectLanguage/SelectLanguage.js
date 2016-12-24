import React, {Component} from 'react'

class SelectLanguage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            closing: false    
        };
    }

    componentWillReceiveProps (nextProps) {
        if(this.props.visible === true && nextProps.visible === false) {
            this.setState({
                closing: true
            });
            setTimeout(
                () => {
                    this.setState({
                        closing: false
                    });
                }, 1000
            );
        }
    }

    render () {
        const { visible, onSelect, onClose } = this.props;
        const { closing } = this.state;

        if(!visible && !closing) return null;

        const animation = closing ? 'flipOutX' : 'flipInX';

        return (
            <div className="select-language-wrapper">
                <div className={`select-language animated ${animation}`}>
                    <div className="title">
                        <i className="world icon big"></i>
                    </div>
                    <div className="choices">
                        <div onClick={ () => {onSelect('en') } }
                            className="choice left">English</div>
                        <div 
                            onClick={ () => {onSelect('ko') } }
                            className="choice right">한국어</div>
                    </div>
                    <div className="cancel" onClick={onClose}>
                        CANCEL
                    </div>
                </div>
                
            </div>
        )
    }
}

export default SelectLanguage;