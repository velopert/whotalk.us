import React, {Component} from 'react'
import Input from './Input';
import ResultContainer from './ResultContainer';
import Result from './Result';

class UserSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            closing: false
        };
    }

    bodyClickListener = (e) => {

        const { onClose } = this.props;

        const el = this.container;
        if(e.target !== el && !el.contains(e.target)) {
            setTimeout(
                () => {
                    onClose();
                    document.body.removeEventListener('click', this.bodyClickListener, true);
                }, 1
            )
        }
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


        if(this.props.show === false && nextProps.show === true) {
            document.body.addEventListener('click', this.bodyClickListener, true); 
        }
    }

    handleUserClick = (username) => {
        const { onClose } = this.props;
        onClose();
        document.body.removeEventListener('click', this.bodyClickListener, true);
        this.context.router.transitionTo('/' + username);
    }

    render () {

        const { show, onChange, value, users } = this.props;
        const { closing } = this.state;
        const { handleUserClick } = this;

        if(!show && !closing) {
            return <div/>
        }

        const userList = users.map(
            (user, index) => (
                <Result username={user} key={index} onClick={()=>{handleUserClick(user)}}/>
            )
        );


        return (
            <div 
                className={`user-search ${closing ? 'flipOutX animated' : 'flipInX animated'}`}
                ref={(ref) => this.container = ref}
            >
                <Input onChange={onChange} value={value}/>
                <ResultContainer>
                    {userList}
                </ResultContainer>
            </div>
        )
    }
}

UserSearch.contextTypes = {
  router: React.PropTypes.object
};

export default UserSearch