import mongoose,  { Schema } from 'mongoose';

const Visit = new Schema({
    accountId: { type: Schema.Types.ObjectId },
    visitedChannel: { type: String },
    date: { type: Date, default: Date.now }
});

Visit.statics.create = function({accountId, visitedChannel}) {
    const visit = new this({
        accountId,
        visitedChannel
    });

    return visit.save();
}

export default mongoose.model('Visit', Visit);