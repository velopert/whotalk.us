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
        }
    },
    date: { type: Date, default: Date.now },
    subscribers: [{type: Schema.Types.ObjectId}]
});


Activity.statics.createChatActivity = function({ username, anonymous, initId, channel, subscribers }) {
    const activity = new this({
        type: "CHAT",
        payload: {
            chat: {
                username,
                anonymous,
                initId,
                channel,
            }        
        },
        subscribers    
    });

    return activity.save();
}

Activity.statics.checkDuplicates = function({followee, follower}) {
    return this.findOne({
        type: 'FOLLOW',
        'payload.follow.followee.username': followee,
        'payload.follow.follower.username': follower,
        date: { $gt: new Date((new Date()).getTime() - 1000 * 60 * 30) }
    }).exec();

}

Activity.statics.createFollowActivity = function({followee, follower, subscribers}) {
    const activity = new this({
        type: "FOLLOW",
        payload: {
            follow: {
                followee,
                follower
            },
        },
        subscribers
    });

    return activity.save();
}

Activity.statics.setLastId = async function({activityId, messageId}) { 
    const activity = await this.findById(activityId).exec();

    if(activity) {
        activity.payload.chat.lastId = messageId;
        return activity.save();
    } else {
        return Promise.resolve('throw');
    }
}


Activity.statics.getInitialActivity = function(subscriberId) {
    return this.find({
        subscribers: subscriberId
    }, '-subscribers')
    .sort({_id: -1})
    .limit(20)
    .lean()
    .exec();
}





export default mongoose.model('Activity', Activity);