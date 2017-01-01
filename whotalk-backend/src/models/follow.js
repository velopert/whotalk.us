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

Follow.statics.unfollow = async function(followId) {
    const follow = await this.findById(followId).exec();
    console.log(follow);
    follow.end = new Date();

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
    .populate('follower', 'common_profile.username common_profile.familyName common_profile.givenName common_profile.thumbnail')
    .select({ 
        follower: 1,
        since: 1
    })
    .lean()
    .exec();
}

Follow.statics.getFollowing = function(follower) {
    return this.find({
        follower,
        end: null
    })
    .limit(20)
    .populate('followee', 'common_profile.username common_profile.familyName common_profile.givenName common_profile.thumbnail')
    .select({ 
        followee: 1,
        since: 1
    }).lean().exec();
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
    }).lean().exec();
}

Follow.statics.getFollowingAfter = function({follower, cursorId}) {
    return this.find({
        _id: { $gt: cursorId},
        follower,
        end: null
    })
    .limit(20)
    .populate('followee', 'common_profile')
    .select({ 
        followee: 1,
        since: 1
    }).lean().exec();
}

Follow.statics.getFollowerCount = function(followee) {
    return this.count({
        followee,
        end: null
    }).exec();
}

Follow.statics.getFollowingCount = function(follower) {
    return this.count({
        follower,
        end: null
    }).exec();
}

Follow.statics.getCommonFollowers = function({userId, userIdArray}) {
    return this.find({
        follower: userId,
        end: null,
        followee: { $in: userIdArray}
    }, 'followee').exec();
}

Follow.statics.getAllFollowers = async function(followee) {
    const followers = await this.find({
        followee,
        end: null
    }).select('follower')
    .exec();

    const array = followers.map(
        (data) => {
            return data.follower
        }
    );

    return array;
}

Follow.statics.clear = function(accountId) {
    return this.remove({
        $or: [
            {followee: accountId},
            {follwer: accountId}
        ]
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