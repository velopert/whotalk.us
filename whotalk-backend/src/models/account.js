import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

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
            id: String,
            access_token: String,
            friends: Schema.Types.Mixed
        },
        google: {
            id: String,
            access_token: String,
            language: String
        }
    }
});


// generate hash, using promise
Account.methods.generateHash = function(password) {
    const p = new Promise(
        (resolve, reject) => {
            bcrypt.hash(password, 8, (err, hash) => {
                if(err) { 
                    reject(err); 
                    return;
                }
                resolve(hash);
            });
        }
    );

    return p;
}



export default mongoose.model('account', Account);
