import React, {PureComponent} from 'react';
import Message from './Message';
import autobind from 'autobind-decorator';


class MessageChunk extends PureComponent {

    static defaultProps = {
        data: []
    }

    @autobind
    mapToMessage(data) {

        if(!data) {
            return null;
        }

        console.time("mapToMessage");

        const messages = [];

        let packet = null, 
            current = null, 
            previous =null,
            message = null;

        for (let i = 0; i < data.length; i++) {
            packet = data[i];
            
            previous = i === 0 ? this.props.previous : {
                ...current
            };

            current = {
                key: packet.payload.suID,
                suID: packet.payload.suID,
                type: packet.type,
                message: packet.payload.message,
                username: packet.payload.username,
                anonymous: packet.payload.anonymous,
                date: packet.payload.date,
                thumbnail: undefined, // later
                temp: packet.temp ? true : false,
                failed: packet.failed ? true : false,
                index: this.props.index * 20 + i,
                previous,
            };

            
            

            message = (
                <Message
                    {...current}
                    onFailure={this.props.onFailure}
                    onRemove={this.props.onRemove}
                    onSend={this.props.onSend}
                    channel={this.props.channel}
                />
            );

            messages.push(message);
        }

        console.timeEnd("mapToMessage");

        return messages;
    }

    shouldComponentUpdate(nextProps, nextState) {
        const result = this.props.last ? nextProps.data.length !== this.props.data.length || JSON.stringify(nextProps) !== JSON.stringify(this.props) : false;
        return result;
    }

    render() {
        const { data } = this.props;
        const { mapToMessage } = this;


        return (
            <div className="message-chunk">
                {mapToMessage(data)}
            </div>
        );
    }
}

export default MessageChunk;