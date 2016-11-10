import Account from './../models/account.js';
import Follow from './../models/follow.js';
import mongoose from 'mongoose';

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


    // get follow count
    const count = await Follow.getFollowerCount(account._id);



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
            return res.json({success: true, count});
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


    res.json({success: true, count: count + 1});
}

export const unfollow = async (req, res) => {

    // check login
    
    if (!req.user) {
        return res
            .status(401)
            .json({code: 0, message: 'NOT LOGGED IN'});
    }

    const followee = req.params.followee;
    const follower = req.user._id;

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
            .json({code: 1, message: 'USER NOT FOUND'});
    }

    // check whether the user is following already

    try {
        const follow = await Follow.checkFollow({
            followee: account._id,
            follower: mongoose
                .Types
                .ObjectId(follower)
        });

        if(!follow) {
            // is not following already
            return res
                .status(404)
                .json({code: 1, message: 'YOU ARE NOT FOLLOWING THIS USER'});
        }
    } catch (error) {
        throw error;
        return;
    }

    const count = await Follow.getFollowerCount(account._id);


    // unfollow
    try {
        await Follow.unfollow(follow._id);
        res.json({
            success: true,
            count: count-1
        });
    } catch (error) {
        throw error;
        return;
    }
}

export const checkFollowing = async (req, res) => {
    
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
    if (!mongoose.Types.ObjectId.isValid(cursorId)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 0
        });
    }

    // query the account
    let account = null;

    try {
        account = await Account.findUser(followee);

        if (!account) {
            return res
                .status(404)
                .json({ code: 1, message: 'USER NOT FOUND' });
        }


        const followers = await Follow.getFollowersAfter({
            followee: account._id,
            cursorId: mongoose
                .Types
                .ObjectId(cursorId)
        });

        res.json({ followers })
    } catch (error) {
        throw error;
    }
}