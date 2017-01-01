import mongoose, { Schema } from 'mongoose';

const type = "local facebook google".split(' ');
const gender = "male female hidden".split(' ');


const Account = new Schema({
    type: { type: String, enum: type },
    password: String,
    common_profile: {
        username: String,
        familyName: String,
        givenName: String,
        gender: { type: String, enum: gender },
        email: String,
        thumbnail: { type: String, default: "none" }
    },
    o_auth: {
        facebook: {
            id: String,
            access_token: String
        },
        google: {
            id: String,
            access_token: String
        }
    }
});


// static methods
Account.statics.findUser = function(username) {
    return this.findOne({ 'common_profile.username': username}).exec();
}

Account.statics.findUserByEmail = function(email) {
    return this.findOne({ 'common_profile.email': email}).exec();
}

Account.statics.findUserByFacebookId = function(id) {
    return this.findOne({ 'o_auth.facebook.id' : id });
}

Account.statics.findUserByGoogleId = function(id) {
    return this.findOne({ 'o_auth.google.id' : id });
}

Account.statics.search = function(username) {
    const re = new RegExp('^' + username);
    return this.find(
        {'common_profile.username': { $regex: re }},
        { 
            'common_profile.username': true
        })
        .limit(5)
        .sort({'common_profile.username': 1})
        .exec();
}

Account.statics.unregister = function(accountId) {
    return this.remove({_id: accountId}).exec();
}

export default mongoose.model('Account', Account);
