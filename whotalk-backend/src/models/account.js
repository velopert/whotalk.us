import mongoose, { Schema } from 'mongoose';

const type = "local facebook google".split(' ');
const gender = "male female".split(' ');


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
            access_token: String,
            id: String,
            friends: Schema.Types.Mixed
        },
        google: {
            access_token: String,
            id: String,
            language: String
        }
    }
});

export default mongoose.model('account', Account);
