import Account from './../models/account.js';
import Message from './../models/message.js';
import Follow from './../models/follow.js';
import mongoose from 'mongoose';

// GET /valid/:username
export const valid = (req, res) => {
    Account
        .findUser(req.params.username)
        .then(account => {
            if (account) {
                const {familyName, givenName, thumbnail} = account.common_profile;
                res.json({
                    valid: true,
                    info: {
                        familyName,
                        givenName,
                        thumbnail
                    }
                });
            } else {
                res
                    .status(404)
                    .json({code: 0, message: 'USER NOT FOUND'});
            }
        });
}

/* 
    FOLLOW 
*/

export const follow = async (req, res) => {
    
    if (!req.user) {
        return res
            .status(401)
            .json({code: 0, message: 'NOT LOGGED IN'});
    }

    const followee = req.params.followee;
    const follower = req.user._id;

    if (followee === req.user.common_profile.username) {
        return res
            .status(400)
            .json({code: 1, message: 'YOU CANNOT FOLLOW YOURSELF'});
    }

    // check account 

    let account = null;

    try {
        account = await Account.findUser(followee);
    } catch (error) {
        throw error;
    }

    if (!account) {
        return res
            .status(404)
            .json({code: 2, message: 'USER NOT FOUND'});
    }

    // check whether the user is following already

    try {
        const follow = await Follow.checkFollow({
            followee: account._id,
            follower: mongoose
                .Types
                .ObjectId(follower)
        });

        if(follow) {
            // is following already
            return res.json({success: true});
        }
    } catch (error) {
        
    }

    try {
        await Follow.follow({
            followee: account._id,
            follower: mongoose
                .Types
                .ObjectId(follower)
        });
    } catch (error) {
        throw error;
    }

    res.json({success: true});
}

export const getFollowers = async (req, res) => {

    const followee = req.params.followee;

    // query the account
    let account = null;

    try {
        account = await Account.findUser(followee);
    } catch (error) {
        throw error;
    }

    if (!account) {
        return res
            .status(404)
            .json({code: 0, message: 'USER NOT FOUND'});
    }

    try {
        const followers = await Follow.getFollowers(account._id);
        res.json({followers})
    } catch (error) {
        throw error;
    }

}


export const getFollowersAfter = async (req, res) => {
    const followee = req.params.followee;
    const cursorId = req.params.cursorId;

    // CHECK MEMO ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(cursorId)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 0
        });
    }
    
    // query the account
    let account = null;

    try {
        account = await Account.findUser(followee);
    } catch (error) {
        throw error;
    }

    if (!account) {
        return res
            .status(404)
            .json({code: 1, message: 'USER NOT FOUND'});
    }

    try {
        const followers = await Follow.getFollowersAfter({
            followee: account._id,
            cursorId: mongoose
                .Types
                .ObjectId(cursorId)
        });
        res.json({followers})
    } catch (error) {
        throw error;
    }

}

/* 
    MESSAGES
*/

export const getRecentMsg = async (req, res) => {
    const username = req.params.username;

    try {
        const messages = await Message.getRecent({channel: username});

        res.json({
            messages: messages.reverse()
        });
    } catch (error) {
        throw error;
    }
}

export const getMsgBefore = async (req, res) => {
    const username = req.params.username;
    const cursorId = req.params.cursorId;

    try {
        const messages = await Message.getBefore({channel: username, cursorId});

        res.json({
            messages: messages.reverse()
        });

    } catch (error) {
        throw error;
    }
}

export const getMsgBetween = async (req, res) => {
    const username = req.params.username;
    const startId = req.params.startId;
    const endId = req.params.endId;

    try {
        const messages = await Message.getBetween({channel: username, startId, endId});
        res.json({
            messages: messages.reverse()
        });
    } catch (error) {
        throw error;
    }
}