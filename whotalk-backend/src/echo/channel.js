import _ from 'lodash';

let sockets = null;
const channels = {};


function emit(connection, data) {
    connection.write(JSON.stringify(data));
}

function Channel(name) {
    this.name = name;
    this.users = []; // stores userId
    this.usernames = {} // stores username

    // adds userId
    this.push = (userId) => {
        this.users.push(userId);

        // // handles multiple window
        // if(!this.usernames[sockets[userId].data.username]){
        //     this.usernames[sockets[userId].data.username] = 1;
        // } else {
        //     this.usernames[sockets[userId].data.username]++;
        // }
    };

    this.validate = (userId) => {
        // handles multiple window
        if(!this.usernames[sockets[userId].data.username]){
            this.usernames[sockets[userId].data.username] = 1;
        } else {
            this.usernames[sockets[userId].data.username]++;
        }
    }

    // removes userId
    this.remove = (userId) => {
        
        // handles multiple window
        if(sockets[userId].data.valid) {
            if(this.usernames[sockets[userId].data.username] !== 1) {
                this.usernames[sockets[userId].data.username]--;
            } else {
                delete this.usernames[sockets[userId].data.username];
            }
        }

        _.remove(this.users, n => {
            return n === userId;
        });
    };

    //broadcast the data to this Channel
    this.broadcast = (data) => {
        for(let i = 0; i < this.users.length; i++) {
            emit(sockets[this.users[i]], data);
        }
    }

    this.countUser = (username) => {
        return this.usernames[username];
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
    if(!channels[name]) {
        //create one if not existing
        channel.create(name);
    }
    return channels[name];
}

export default channel;