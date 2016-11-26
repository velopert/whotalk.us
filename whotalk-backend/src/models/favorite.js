import mongoose, {Schema} from 'mongoose';

const Favorite = new Schema({
    accountId: { type: Schema.Types.ObjectId },
    favoriteChannel: { type: String }
});

Favorite.statics.add = function({accountId, favoriteChannel}) {
    const favorite = new this({
        accountId,
        favoriteChannel
    });

    return favorite.save();
};

Favorite.statics.check = function({accountId, favoriteChannel}) {
    return this.findOne({
        accountId, favoriteChannel
    }).exec();
}

Favorite.statics.list = function(accountId) {
    return this.find({
        accountId
    })
}


export default mongoose.model('Favorite', Favorite);

