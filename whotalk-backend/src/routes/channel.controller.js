import Account from './../models/account.js';
import Follow from './../models/follow.js';
import Visit from './../models/visit.js';

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

        let followed = false;


        // logged
        if (req.user) {
            followed = (await Follow.checkFollow({ 
                followee: account._id, 
                follower: req.user._id 
            })) ? true : false;
            
            if(req.params.username !== req.user.common_profile.username) {
                Visit.create({
                    accountId: req.user._id,
                    visitedChannel: req.params.username
                });
            }

        }


        res.json({
            valid: true,
            info: {
                familyName,
                givenName,
                thumbnail,
                following,
                followers,
                followed
            }
        });
    } else {
         res.status(404).json({code: 0, message: 'USER NOT FOUND'});
    }
}