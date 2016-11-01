import React, {Component, PropTypes} from 'react';
import DateSeparator from './DateSeparator';
import Thumbnail from './Thumbnail';
import anonymousThumbnail from 'assets/anonymous.png';

class Message extends Component {
    static propTypes = {
        suID: PropTypes.string,
        type: PropTypes.oneOf(['JOIN', 'MSG', 'LEAVE']),
        message: PropTypes.string,
        username: PropTypes.string,
        anonymous: PropTypes.bool,
        date: PropTypes.number,
        thumbnail: PropTypes.string,
        previous: PropTypes.object
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(JSON.stringify(this.props.suID)!==JSON.stringify(nextProps.suID)){
            return true;
        } else { 
            return false;
        }
    }
    
    render() {
        const {
            suID,
            type,
            message,
            username,
            anonymous,
            date,
            thumbnail,
            previous,
            temp
        } = this.props;

        const isEvent = type !== 'MSG';

        const parsedDate = new Date(date);

        let previousDate = null;
        if(previous) {
            previousDate = new Date(previous.date);
        }

        const showDate = !previous ||
            previousDate.getDate() !== parsedDate.getDate(); 

        const showMessageInfo = !previous || showDate ||
            previousDate.getHours() !== parsedDate.getHours() ||
            username !== previous.username || isEvent;
        
        const timeString = parsedDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })

        

        let eventText = null;

        if (isEvent) {
            eventText = (type === 'JOIN')
                ? 'Joined the channel'
                : 'Left the channel';
        }

        return (
            <div className="message">
                {showDate
                    ? <DateSeparator date={parsedDate}/>
                    : ''}
                {showMessageInfo
                    ? (
                        <div className="info">
                            <Thumbnail image={anonymous ? anonymousThumbnail : thumbnail}/>
                            <div className="info-text">
                                <span className="username">{username}</span>
                                {anonymous? (
                                    <span className="anonymous">(anonymous)</span>
                                ):''}
                                <span className="date">{timeString}</span>
                            </div>
                        </div>
                    )
                    : ''}
                {isEvent
                    ? (
                        <div className="event">
                            {eventText}
                        </div>
                    )
                    : (
                        <div className={`text ${temp?'temp':''}`}>
                            {message}
                        </div>
                    )}

            </div>
        );
    }
}

export default Message;