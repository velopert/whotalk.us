import React, {Component} from 'react';
import MessageChunk from './MessageChunk';
import Loader from'./Loader';
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
            previous={i === 0 ? null : data[i * 20 - 1].payload}
            index={i}
            last={i >= Math.floor(data.length / 20) - 4}
            onFailure={this.props.onFailure}
            onRemove={this.props.onRemove}
            onSend={this.props.onSend}
            channel={this.props.channel}
        />));

        console.timeEnd("mapToChunks");

        return chunks;
    }


    

    render() {
        const {data, showLoader} = this.props;
        const {mapToChunks} = this;

        return (
            <div className="message-list">
                { showLoader ? <Loader/> : undefined }
                {mapToChunks(data)}
            </div>
        );
    }
}

export default MessageList;