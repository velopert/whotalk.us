import mongoose, { Schema } from 'mongoose';

const Message = new Schema({
    suID: { type: String, unique: true },
    type: { type: String },
    channel: { type: String },
    anonymous: { type: Boolean },
    username: { type: String },
    message: { type: String },
    date: { type: Date, default: Date.now },
    private: { type: Boolean, default: false },
    target: { type: String, default: false }
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

Message.statics.getBetween = function({channel, startId, endId, onlyMessage = false}) {
    
    const option = onlyMessage ? { type: 'MSG' } : {};

    return this.find({...option, channel, suID: {$gt: startId, $lt: endId}})
    .sort({_id: -1})
    .limit(20)
    .exec();
}


Message.statics.getAfter = function({channel, cursorId}) {
    return this.find({channel, suID: {$gt: cursorId}})
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
        channel,
        _id: { $gt: messageId }
    }, '_id').exec();
}

export default mongoose.model('Message', Message);