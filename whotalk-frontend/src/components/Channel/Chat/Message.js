import React, {Component, PropTypes} from 'react';
import DateSeparator from './DateSeparator';
import Thumbnail from './Thumbnail';
import anonymousThumbnail from 'assets/anonymous.png';

function printTime(d) {
   var hh = ("0" + d.getHours() % 12).slice(0,2);
   var mm = ("0" + d.getMinutes()).slice(0,2);
   return hh + ":" + mm;
}

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
        if (this.props.suID !== nextProps.suID) {
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
        if (previous) {
            previousDate = new Date(previous.date);
        }

        const showDate = !previous || previousDate.getDate() !== parsedDate.getDate();

        const showMessageInfo = !previous || showDate || previousDate.getHours() !== parsedDate.getHours() || username !== previous.username || isEvent;

        const timeString = parsedDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        let altTimeString = printTime(parsedDate);

        let eventText = null;

        if (isEvent) {
            eventText = (type === 'JOIN')
                ? 'Joined the channel'
                : 'Left the channel';
        }

        return (
            <div>
                {showDate
                    ? <DateSeparator date={parsedDate}/>
                    : ''}
                <div className="message">
                    {showMessageInfo
                        ? (
                            <div className="info">
                                <Thumbnail
                                    image={anonymous
                                    ? anonymousThumbnail
                                    : thumbnail}/>
                                <div className="info-text">
                                    <span className="username">{username}</span>
                                    {anonymous
                                        ? (
                                            <span className="anonymous">(anonymous)</span>
                                        )
                                        : ''}
                                    <span className="date">{timeString}</span>
                                </div>
                            </div>
                        )
                        : ''}
                        <div className="alt-time">
                            {altTimeString}
                        </div>
                    {isEvent
                        ? (
                            <div className="event">
                                {eventText}
                            </div>
                        )
                        : (
                            <div
                                className={`text ${temp
                                ? 'temp'
                                : ''}`}>
                                {message}
                            </div>
                        )}

                </div>
            </div>
        );
    }
}

export default Message;