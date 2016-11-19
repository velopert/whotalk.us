import _ from 'lodash';
import Message from './../models/message.js';
import { server as SEND } from './packetTypes';
import {log, generateUID} from './helper';
import Activity from '../models/activity';
import Account from '../models/account';
import Follow from '../models/follow';

let sockets = null;
const channels = {};


function emit(connection, data) {
    connection.write(JSON.stringify(data));
}

function Channel(name) {
    this.name = name;
    this.users = []; // stores userId
    this.usernames = {}; // stores username
    this.sleep = true;
    this.timeout = null;
    this.killChannelTimeout = null;



    // adds userId
    this.push = (userId) => {
        this.users.push(userId);
        if(this.killChannelTimeout) {
            clearTimeout(this.killChannelTimeout);
            this.killChannelTimeout = null; // revive
        }

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

        if(this.users.length === 0) {
            channel.remove(this.name);
        }
    };

    //broadcast the data to this Channel
    this.broadcast = async (data, userId = null) => {
        for(let i = 0; i < this.users.length; i++) {
            emit(sockets[this.users[i]], data);
        }
        
        //({suID, type, channel, anonymous, username, message}
        const result = await Message.write({
            suID: data.payload.suID,
            type: data.type,
            channel: this.name,
            anonymous: data.payload.anonymous,
            username: data.payload.username,
            message: data.payload.message
        });


        if(data.type === "MSG" && this.sleep === true) {
            log('Channel ' + this.name + ' is awake');
            this.sleep = false;
            clearTimeout(this.timeout);

            const userFollowers = await Follow.getAllFollowers(userId);
            console.log(userFollowers);

            const channelFollowers = await Follow.getAllFollowers(this.channelId);

            const subscribers = _.union(userFollowers, channelFollowers);
            console.log('subscribers: ', subscribers);
            console.log('channelId', this.channelId);

            // create Activity
            await Activity.createChatActivity({
                username: data.payload.username,
                anonymous: data.payload.anonymous,
                initId: result._id,
                channel: this.name,
                subscribers
            });

            this.timeout = setTimeout(
                () => {
                    log('Channel ' + this.name + ' is sleeping');
                    this.sleep = true;
                    Message.write({
                        suID: generateUID(),
                        type: "SLEEP",
                        channel: this.name
                    });
                }, 1000 * 60// 1 hour
            )
        }
    }

    this.countUser = (username) => {
        return this.usernames[username];
    }
}

function channel(_sockets) {
    sockets = _sockets;
}

channel.create = async (name) => {
    channels[name] = new Channel(name);
    log(name + ' channel is created');
    log(Object.keys(channels).length + ' channels alive');

    const account = await Account.findUser(name);
    if(!account) {
        return false;
    } 
    
    channels[name].channelId = account._id;
    
    return true;
}

channel.remove = (name) => {
    // kill channel when there is no new user within 1 minutes.
    channels[name].killChannelTimeout = setTimeout(
        () => {
            clearTimeout(channels[name].timeout);
            Message.write({
                suID: generateUID(),
                type: "SLEEP",
                channel: name
            });

            delete channels[name];
            log(name + ' channel is dying..');
            log(Object.keys(channels).length + ' channels alive');
        }, 1000 * 60 
    );
}

channel.get = (name) => {
    if(!channels[name]) {
        //create one if not existing
        channel.create(name);
    }
    return channels[name];
}

export default channel;