import mongoose, { Schema } from 'mongoose';


const Follow = new Schema({
    followee: { type: Schema.Types.ObjectId, ref: 'Account' },
    follower: { type: Schema.Types.ObjectId, ref: 'Account' },
    since: { type: Date, default: Date.now },
    end: { type: Date, default: null},
    secret: { type: Boolean, default: false }
});

// Message.statics.getAfter = function({channel, cursorId}) {
//     return this.find({channel, suID: {$gt: cursorId}})
//     .sort({_id: -1})
//     .limit(20)
//     .exec();
// }

Follow.statics.follow = function({followee, follower}) {
    const follow = new this({
        followee,
        follower
    });

    return follow.save();
}

Follow.statics.checkFollow = function({followee, follower}) {
    return this.findOne({
        follower,
        followee,
        end: null
    }).exec();
}

Follow.statics.getFollowers = function(followee) {
    return this.find({
        followee,
        end: null
    })
    .limit(20)
    .populate('follower', 'common_profile')
    .select({ 
        follower: 1,
        since: 1
    }).exec();
}

Follow.statics.getFollowersAfter = function({followee, cursorId}) {
    return this.find({
        _id: { $gt: cursorId},
        followee,
        end: null
    })
    .limit(20)
    .populate('follower', 'common_profile')
    .select({ 
        follower: 1,
        since: 1
    }).exec();
}

// Message.statics.write = function({suID, type, channel, anonymous, username, message = ''}) {
//     const msg = new this({
//         suID,
//         type,
//         channel,
//         anonymous,
//         username,
//         message
//     });

//     return msg.save();
// }

export default mongoose.model('Follow', Follow);