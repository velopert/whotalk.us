import React, {PureComponent} from 'react';
import Message from './Message';
import autobind from 'autobind-decorator';


class MessageList extends PureComponent {

    @autobind
    mapDataToMessage(data, isTemp = false) {

        console.time("mapDataToMessage");

        const messages = [];

        let packet = null, 
            current = null, 
            previous =null,
            message = null;

        for (let i = 0; i < data.length; i++) {
            packet = data[i];
            
            if(isTemp) {
                // handling first packet
                if(i===0) {
                    if(this.props.data.length===0) {
                        // real data is empty
                        previous = null;
                    } else {
                        // has data
                        previous = this.props.data[this.props.data.length-1].payload;
                    }
                } else {
                    previous = { ...current }
                }
            } else {
                previous = i === 0 ? null : {
                    ...current
                };
            }

            current = {
                key: isTemp ? packet.payload.uID : packet.payload.suID,
                suID: isTemp ? packet.payload.uID : packet.payload.suID,
                type: packet.type,
                message: packet.payload.message,
                username: packet.payload.username,
                anonymous: packet.payload.anonymous,
                date: packet.payload.date,
                thumbnail: undefined, // later
                previous
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

    render() {
        const { data, temp } = this.props;
        const { mapDataToMessage } = this;


        return (
            <div className="message-list">
                {mapDataToMessage(data)}
                {mapDataToMessage(temp, true)}
            </div>
        );
    }
}

export default MessageList;