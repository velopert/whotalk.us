import mongoose, { Schema } from 'mongoose';

const StatusMessage = new Schema({
    accountId: { type: Schema.Types.ObjectId },
    message: { type: String },
    date: { type: Date, default: Date.now }
});

StatusMessage.statics.change = function({accountId, message}) {
    const statusMessage = new this({
        accountId,
        message
    }).save();

    return statusMessage;
}

StatusMessage.statics.get = async function(accountId) {
    try {
        const messages = await this.find({
            accountId
        }).sort({_id: -1})
        .limit(1).lean().exec();

        if(!messages) return null;
        if(messages.length < 1) return null;

        return messages[0];

    } catch(e) {
        return null;
    }
}

export default mongoose.model('StatusMessage', StatusMessage);