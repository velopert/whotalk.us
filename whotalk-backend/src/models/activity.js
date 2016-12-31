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
            followee: [Schema.Types.Mixed],
            /*{
                username: String,
                givenName: String,
                familyName: String
            }*/
            follower: {
                username: String
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

// remove later
Activity.statics.checkDuplicates = function({followee, follower}) {
    return this.findOne({
        type: 'FOLLOW',
        'payload.follow.followee.username': followee,
        'payload.follow.follower.username': follower,
        date: { $gt: new Date((new Date()).getTime() - 1000 * 60 * 30) }
    }).exec();
}

Activity.statics.findRecentFollowActivity = function(follower) {
    return this.findOne({
        type: 'FOLLOW',
        'payload.follow.follower.username': follower,
        date: { $gt: new Date((new Date()).getTime() - 1000 * 60 * 30) }
    });
}

Activity.statics.createFollowActivity = function({followee, follower, subscribers}) {
    const activity = new this({
        type: "FOLLOW",
        payload: {
            follow: {
                followee: [followee],
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

Activity.statics.getActivityBefore = function({subscriberId, activityId}) {
    return this.find({
        subscribers: subscriberId,
        _id: { $lt: activityId }
    }, '-subscribers')
    .sort({_id: -1})
    .limit(20)
    .lean()
    .exec()
}

Activity.statics.clearChatActivity = function(username) {
    return this.remove({
        type: "CHAT",
        "payload.chat.channel": username  
    }).exec();
}


export default mongoose.model('Activity', Activity);