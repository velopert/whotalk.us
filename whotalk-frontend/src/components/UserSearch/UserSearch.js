import React, {Component} from 'react'

class UserSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            closing: false
        };
    }



    componentWillReceiveProps (nextProps) {
        if(this.props.show === true && nextProps.show === false) {

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

        const { onClose } = this.props;
        
        

        const bodyClickListener = (e) => {
            const el = this.container;
            if(e.target !== el && !el.contains(e.target)) {
                setTimeout(
                     () => {
                         onClose();
                         document.body.removeEventListener('click', bodyClickListener, true);
                     }, 1
                 )
            }
        }


        if(this.props.show === false && nextProps.show === true) {
            document.body.addEventListener('click', bodyClickListener, true); 
        }
    }
    

    render () {

        const { show } = this.props;
        const { closing } = this.state;

        if(!show && !closing) {
            return <div/>
        }

        return (
            <div 
                className={`user-search ${closing ? 'flipOutX animated' : 'flipInX animated'}`}
                ref={(ref) => this.container = ref}
            >
                
            </div>
        )
    }
}

export default UserSearch