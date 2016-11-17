import mongoose, { Schema } from 'mongoose';

const type = "FOLLOW CHAT".split(' ');


const Activity = new Schema({
    type: { type: String, enum: type },
    payload: {
        chat: {
            initId:  { type: Schema.Types.ObjectId },
            channel: String
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
        }
    },
    date: { type: Date, default: Date.now },
});



export default mongoose.model('Activity', Activity);