import Account from './../models/account.js';
import Follow from './../models/follow.js';
import Visit from './../models/visit.js';
import Favorite from './../models/favorite.js';
import Message from './../models/message.js';
import StatusMessage from './../models/statusMessage.js';

import mongoose from 'mongoose';

// GET /info/:username
export const getInfo = async (req, res) => {
    
    const account = await Account.findUser(req.params.username);

    if(account) {
        // const {familyName, givenName, thumbnail} = account.common_profile;
        const familyName = account.common_profile.familyName;
        const givenName = account.common_profile.givenName;
        const thumbnail = account.common_profile.thumbnail;
        const followers = await Follow.getFollowerCount(account._id);
        const following = await Follow.getFollowingCount(account._id);
        const distinctUsers = await Message.find({channel: req.params.username}).distinct('username').exec();


        let followed = false;
        let isFavorite = false;



        // logged
        if (req.user) {
            followed = (await Follow.checkFollow({ 
                followee: account._id, 
                follower: req.user._id 
            })) ? true : false;

            isFavorite = (await Favorite.check({
                accountId: req.user._id,
                favoriteChannel: req.params.username
            })) ? true : false;
        }


        res.json({
            valid: true,
            info: {
                familyName,
                givenName,
                thumbnail,
                talkers: distinctUsers.length,
                following,
                followers,
                followed,
                isFavorite,
                
            }
        });
    } else {
         return res.status(404).json({code: 0, message: 'USER NOT FOUND'});
    }

    // process this after response


    // logged
    if (req.user) {
        if(req.params.username !== req.user.common_profile.username) {               

            // if the visit exists in recentVisits, remove it.            
            const recentVisits = await Visit.get(req.user._id);
            for(var visit of recentVisits) {
                if(visit.visitedChannel === req.params.username ) {
                    await Visit.findByIdAndRemove(visit._id).exec();
                    break;
                }
            }

            await Visit.create({
                accountId: req.user._id,
                visitedChannel: req.params.username
            });
        }
    }
}

// POST /api/channel/add-favorite/:username
export const addFavorite = async (req, res) => {

    // not logged in
    if (!req.user) {
        return res
            .status(401)
            .json({code: 0, message: 'NOT LOGGED IN'});
    }

    // check whether it is already in Favorite
    const favorite = await Favorite.check({
        accountId: req.user._id,
        favoriteChannel: req.params.username
    });

    if(favorite) {
        return res.json({
            success: true
        });
    } 

    // add to follow
    await Favorite.add({
        accountId: req.user._id,
        favoriteChannel: req.params.username
    });

    return res.json({
        success: true
    })
}

// DELETE /api/channel/favorite/:username
export const deleteFavorite = async (req, res) => {
    // not logged in
    if (!req.user) {
        return res
            .status(401)
            .json({code: 0, message: 'NOT LOGGED IN'});
    }

    // check whether it is already in Favorite
    const favorite = await Favorite.check({
        accountId: req.user._id,
        favoriteChannel: req.params.username
    });

    // not a favorite channel
    if(!favorite) {
        return res.json({
            success: true
        });
    } 

    // remove the favorite channel
    await Favorite.findByIdAndRemove(favorite._id);

    return res.json({
        success: true
    });
}


// GET /api/channel/status-message/:username
export const getStatusMessage = async (req, res) => {
    const username = req.params.username;

    const account = await Account.findUser(req.params.username);
    
    if(!account) {
        return res.status(403).json({
            error: 'USER NOT FOUND',
            code: 1
        });
    }

    const statusMessage = await StatusMessage.get(account);

    res.json({
        message: statusMessage === null ? '' : statusMessage.message
    });
}

