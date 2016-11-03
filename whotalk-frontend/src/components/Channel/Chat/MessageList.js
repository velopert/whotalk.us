import React, {PureComponent} from 'react';
import Message from './Message';
import autobind from 'autobind-decorator';


class MessageList extends PureComponent {

    @autobind
    mapDataToMessage(data) {

        console.time("mapDataToMessage");

        const messages = [];

        let packet = null, 
            current = null, 
            previous =null,
            message = null;

        for (let i = 0; i < data.length; i++) {
            packet = data[i];
            
            previous = i === 0 ? null : {
                ...current
            };

            current = {
                key: packet.temp ? packet.payload.uID : packet.payload.suID,
                suID: packet.temp ? packet.payload.uID : packet.payload.suID,
                type: packet.type,
                message: packet.payload.message,
                username: packet.payload.username,
                anonymous: packet.payload.anonymous,
                date: packet.payload.date,
                thumbnail: undefined, // later
                temp: packet.temp ? true : false,
                previous,
            };

            
            

            message = (
                <Message
                    {...current}
                />
            );

            messages.push(message);
        }

        console.timeEnd("mapDataToMessage");

        return messages;
    }

    shouldComponentUpdate(nextProps, nextState) {
         return nextProps.data.length !== this.props.data.length || JSON.stringify(nextProps) !== JSON.stringify(this.props);
    }

    render() {
        const { data } = this.props;
        const { mapDataToMessage } = this;


        return (
            <div className="message-list">
                {mapDataToMessage(data)}
            </div>
        );
    }
}

export default MessageList;