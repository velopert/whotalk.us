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
    }, '_id').exec();
}



Message.statics.getMessagesForActivity = function({channel, initId, lastId = null}) {
    return this.find({
        type: 'MSG',
        channel, 
        _id: (lastId) ? { $gte: initId, $lte: lastId } : { $gte: initId }
    }, 'username message date anonymous')
    .limit(10)
    .exec();
}

export default mongoose.model('Message', Message);