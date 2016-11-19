import mongoose, { Schema } from 'mongoose';

const type = "FOLLOW CHAT".split(' ');


const Activity = new Schema({
    type: { type: String, enum: type },
    payload: {
        chat: {
            username: String,
            anonymous: Boolean,
            initId:  { type: Schema.Types.ObjectId },
            channel: String,
            lastId: { type: Schema.Types.ObjectId }
        },
        follow: {
            followee: {
                username: String
            },
            follower: {
                username: String,
                givenName: String,
                familyName: String
            }
        },
        subscribers: [{type: Schema.Types.ObjectId}]
    },
    date: { type: Date, default: Date.now },
});


Activity.statics.createChatActivity = function({ username, anonymous, initId, channel }) {
    const activity = new this({
        type: "CHAT",
        payload: {
            chat: {
                username,
                anonymous,
                initId,
                channel
            }
        }
    });

    return activity.save();
}



export default mongoose.model('Activity', Activity);