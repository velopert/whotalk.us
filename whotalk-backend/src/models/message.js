import mongoose, { Schema } from 'mongoose';
import cache from './../helpers/cache';

const Message = new Schema({
    suID: { type: String, unique: true },
    type: { type: String },
    channel: { type: String },
    anonymous: { type: Boolean },
    username: { type: String },
    message: { type: String },
    date: { type: Date, default: Date.now },
    private: { type: Boolean, default: false },
    target: { type: String, default: undefined }
});

Message.statics.getRecent = function({channel}) {
    return this.find({channel})
    .sort({"suID": -1})
    .limit(40)
    .exec();
}

Message.statics.getBefore = function({channel, cursorId}) {
    return this.find({channel, suID: {$lt: cursorId}})
    .sort({_id: -1})
    .limit(20)
    .exec();
}

Message.statics.getBetween = function({channel, startId, endId}) {
    return this.find({channel, suID: {$gt: startId, $lt: endId}})
    .sort({_id: -1})
    .limit(20)
    .exec();
}


Message.statics.write = function({suID, type, channel, anonymous, username, message = ''}) {
    const msg = new this({
        suID,
        type,
        channel,
        anonymous,
        username,
        message
    });

    return msg.save();
}

Message.statics.getLastMessage = function({channel, username}) {
    return this.findOne({
        channel,
        username
    }).sort({_id: -1}).exec();
}

Message.statics.getSleepMessageAfter = function({channel, messageId}) {
    return this.findOne({
        type: 'SLEEP',
        channel,
        _id: { $gt: messageId }
    }, '_id').lean().exec();
}


// cached
Message.statics.getMessagesForActivity = async function({channel, initId, lastId = null}) {

    if(cache.chatActivities.has(channel+initId)) {
        return Promise.resolve(cache.chatActivities.get(channel+initId));
    }
    
    const messages = await this.find({
        type: 'MSG',
        channel, 
        _id: (lastId) ? { $gte: initId, $lte: lastId } : { $gte: initId }
    }, 'username message date anonymous')
    .limit(10)
    .lean()
    .exec();

    if(lastId) {
        cache.chatActivities.set(channel+initId, messages)
    }


    return Promise.resolve(messages);
}

Message.statics.clear = function(username) {
    return this.remove({channel: username}).exec();
}

export default mongoose.model('Message', Message);