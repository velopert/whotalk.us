import React, {Component, PropTypes} from 'react';
import DateSeparator from './DateSeparator';
import Thumbnail from './Thumbnail';
import anonymousThumbnail from 'assets/anonymous.png';
import autobind from 'autobind-decorator';


import {injectIntl} from 'react-intl';
import { prepareMessages } from 'locale/helper';

const messages = prepareMessages({
    "Chat.join": "* Joined the channel",
    "Chat.left": "* Left the channel"
})

function printTime(d) {
    var hh = ("0" + d.getHours() % 12).slice(-2);
    var mm = ("0" + d.getMinutes()).slice(-2);
    return hh + ":" + mm;
}

function charSum(str) {
    let sum = 0;
    str.split('').forEach(char=>{sum+=char.charCodeAt(0)});
    return sum;
}

class Message extends Component {
    static propTypes = {
        suID: PropTypes.string,
        type: PropTypes.oneOf(['JOIN', 'MSG', 'LEAVE', 'SLEEP']),
        message: PropTypes.string,
        username: PropTypes.string,
        anonymous: PropTypes.bool,
        date: PropTypes.number,
        thumbnail: PropTypes.string,
        previous: PropTypes.object
    }

    

    constructor(props) {
        super(props);
        this.timeoutId = null;
    }

    @autobind
    generateColor(username) {
        let alteredCharSum = Math.pow(charSum(this.props.channel) + 31 * charSum(username), 3) + '';
        alteredCharSum = alteredCharSum.slice(-6);
        let rgb = alteredCharSum.match(/.{1,2}/g).map(s=>90 + parseInt(s));
        return {color: `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`};
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.suID !== nextProps.suID || 
            this.props.index !== nextProps.index || 
            this.props.failed !== nextProps.failed) {
            return true;
        } else {
            return false;
        }
    }

    componentDidMount() {
        if (this.props.temp) {
            this.timeoutId = setTimeout(() => {
                this.props.onFailure(this.props.index);
            }, 5000);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
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
            temp,
            failed,
            index,
            onRemove,
            onSend,
             intl: {
                formatMessage
            }
        } = this.props;

        const { generateColor } = this;

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

        if(type === 'SLEEP'){
            return null;
        }
        
        if (isEvent) {
            eventText = (type === 'JOIN')
                ? formatMessage(messages.join)
                : formatMessage(messages.left);
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
                                    : "/api/common/thumbnail/" + username}/>
                                <div className="info-text">
                                    <span className="username" style={generateColor(username)}>{username}</span>
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
                    {failed
                        ? (
                            <div className="failed">Failed to send this message,
                                <span className="action" onClick={() => {
                                    onRemove(index);
                                    onSend(message);
                                }}>retry</span>
                                or
                                <span className="action" onClick={()=>{onRemove(index)}}>remove</span>
                            </div>
                        )
                        : undefined}

                </div>
            </div>
        );
    }
}

export default injectIntl(Message);