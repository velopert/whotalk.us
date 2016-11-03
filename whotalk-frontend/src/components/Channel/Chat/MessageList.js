import React, {Component} from 'react';
import MessageChunk from './MessageChunk';
import autobind from 'autobind-decorator';
import chunk from 'helpers/chunk';

class MessageList extends Component {

    @autobind
    mapToChunks(data) {
        console.time("mapToChunks");

        const dataChunks = chunk(data, 20);
        const chunks = dataChunks.map((chunk, i) => (<MessageChunk
            data={chunk}
            key={chunk.length ? chunk[0].payload.suID : 0}
            previous={i === 0 ? null : data[i * 19].payload}
            last={i === Math.floor(data.length / 20)}/>));

        console.timeEnd("mapToChunks");

        return chunks;
    }

    render() {
        const {data} = this.props;
        const {mapToChunks} = this;

        return (
            <div className="message-list">
                {mapToChunks(data)}
            </div>
        );
    }
}

export default MessageList;