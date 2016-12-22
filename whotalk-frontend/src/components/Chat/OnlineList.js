import React, {Component} from 'react'
import {FormattedMessage} from 'react-intl';

import {Scrollbars} from 'react-custom-scrollbars';

const User = ({username, anonymous, owner}) => {
    return (
        <li className={anonymous && 'anonymous'}>
            <i className={`user icon ${owner ? 'yellow' : ''}`}></i>{username}
        </li>
    )
}

class OnlineList extends Component {

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
                }, 700
            );
        }
    }

    renderThumb = ({ style, ...props }) => {
        // IT STYLIZES THE CUSTOM SCROLLBAR
        const thumbStyle = {
            backgroundColor: 'rgba(255,255, 255, 0.8)',
            borderRadius: '3px'
        };

        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props}/>
        );
    }

    render() {
        const { show, onClose, users, owner } = this.props;
        const { closing } = this.state;

        if(!show && !closing) {
            return <div></div>;
        }

        const userList = users.map(
            (user, index) => (
                <User
                    username={user.username}
                    anonymous={user.anonymous}
                    owner={owner===user.username}
                    key={index}
                />
            )
        );

// <FormattedMessage 
//                             id="LinksContainer.empty" 
//                             defaultMessage="List is empty"/>

                    // <li><i className="user icon"></i>auser</li>
                    // <li><i className="user yellow icon"></i>anotherUser</li>
                    // <li className="anonymous"><i className="spy icon"></i>anonymous</li>
        return (
            <div className={`online-list ${closing ? 'hide' : 'reveal'}`}>
                <div className="title-bar">
                    <div className="title">
                        <FormattedMessage
                            id="OnlineList.title"
                            defaultMessage="ONLINE LIST"
                        />
                    </div>
                    <button 
                        className="ui mini red button circular icon close"
                        onClick={onClose}
                    >
                        <i className="icon remove"></i>
                    </button>
                </div>

                    {
                        users.length === 0 && (
                            <div className="empty">
                                <div><i className="large help circle icon"></i></div>
                                <span>
                                    <FormattedMessage
                                        id="OnlineList.empty"
                                        defaultMessage="LIST IS EMPTY"
                                    />
                                </span>
                            </div> 
                        )
                    }
                    
                <ul>
                    { users.length < 7 ? userList : (
                        <Scrollbars 
                        
                            style={{
                                width: 200, height: 250
                            }}

                            renderThumbVertical={this.renderThumb}
                        
                        >
                            {userList}
                        </Scrollbars>
                    ) }
                    
                </ul>
            </div>
        );
    }
}

export default OnlineList