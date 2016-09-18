import _ from 'lodash';

let sockets = null;
const channels = {};


function emit(connection, data) {
    connection.write(JSON.stringify(data));
}

function Channel(name) {
    this.name = name;
    this.users = []; // stores userId

    // adds userId
    this.push = (userId) => {
        this.users.push(userId);
    };

    // removes userId
    this.remove = (userId) => {
        _.remove(this.users, n => {
            return n === userId;
        });
    };

    //broadcast the data to this Channel
    this.broadcast = (data) => {
        for(let userId in this.users) {
            emit(sockets[userId], data);
        }
    }
}

function channel(_sockets) {
    sockets = _sockets;
}

channel.create = (name) => {
    channels[name] = new Channel(name);
}

channel.remove = (name) => {
    delete channels[name];
}

channel.get = (name) => {
    return channels[name];
}

export default channel;