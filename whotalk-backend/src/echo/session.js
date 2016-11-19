import md5 from 'md5';
import cache from './../helpers/cache.js'
import Session from './../models/session.js';
import Account from './../models/account.js';

const session = {};

// get username by sessionId
session.get = async (sessionID) => {

    // check the session cache
    if(cache.session.has(sessionID)) {
        return cache.session.get(sessionID);
    }

    const sess = await Session.findOne({_id: sessionID}).exec();

    // invalid session
    if(!sess) return null;

    const s = JSON.parse(sess.session);

    // not logged in
    if(!s.passport) return null;

    let account;

    // check the account cache
    if (cache.passport.has(s.passport.user)) {
        account = cache.passport.get(s.passport.user);
    } else {
        account = await Account.findById(s.passport.user);
    }
    
    // couldn't find account'
    if(!account) return null;

    // store the username in cache
    cache.session.set(sessionID, {
        _id: account._id,
        username: account.common_profile.username
    });

    return {
        _id: account._id,
        username: account.common_profile.username
    };
    // check cache whether it has one
    // if (cache.session.has(sessionID)) {
    //     return cb(cache.session.get(sessionID));
    // }

    // let accountId = null;
    // // if not, do some mongo works
    // Session
    //     .findOne({_id: sessionID})
    //     .exec()
    //     .then((sess => {
    //         console.log(sess);
    //         // does not have session
    //         if (!sess) {
    //             cb(null);
    //         }

    //         const s = JSON.parse(sess.session);
    //         // not logged in
    //         if (!s.passport) {
    //             cb(null);
    //         }

    //         accountId = s.passport.user;

    //         // check whether it exists in passport cache
    //         if (cache.passport.has(accountId)) {
    //             cb(cache.passport.get(accountId));
    //         }

    //         return Account
    //             .findById(accountId)
    //             .exec();
    //     }))
    //     .then(account => {
    //         cache
    //             .passport
    //             .set(accountId, account);
    //         cache
    //             .session
    //             .set(sessionID, account.common_profile.username);
    //         cb(account.common_profile.username);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         cb(null);
    //     });
}

// gets anonymous username
session.getAnonymousName = (sessionID, channel) => {
    const hash = md5(sessionID + channel);
    // alphabet only
    return hash
        .substr(0, 5)
        .split('')
        .map(value => {
            const charCode = value.charCodeAt(0);
            if (charCode <= 57) {
                return String.fromCharCode(charCode + 49);
            } else {
                return String.fromCharCode(charCode + 10);
            }
        })
        .join('')
}

export default session;