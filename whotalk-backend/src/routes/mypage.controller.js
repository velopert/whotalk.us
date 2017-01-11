import Account from './../models/account.js'
import StatusMessage from './../models/statusMessage.js';
import Message from './../models/message.js';
import Activity from './../models/activity';
import Follow from './../models/follow';

import inspector from 'schema-inspector';
import { generateHash, compareHash } from './../helpers/bcrypt';
import cache from './../helpers/cache';
import fs from 'fs';
import shortid from 'shortid';


// GET /api/mypage

export const getInitialSetting = async (req, res) => {
    if (!req.user) {
        return res.status(403).json({
            error: 'not logged in'
        });
    }

    const promises = [
        Account.findById(req.user._id).lean(),
        StatusMessage.get(req.user._id)
    ];

    const results = await Promise.all(promises);


    const account = results[0];
    const statusMessage = results[1];


    
    
    return res.json({
        account: { 
            ...account.common_profile, 
            type: account.type,
        },
        channel: {
            statusMessage: statusMessage === null ? '' : statusMessage.message
        } 
    });
}

// PATCH /api/mypage/account
export const updateAccountSetting = async (req, res) => {

    if (!req.user) {
        return res.status(403).json({
            code: -1,
            error: 'not logged in'
        });
    }

    /* validate the data */
    const validation = {
        type: 'object',
        properties: {
            email: {
                type: 'string',
                pattern: 'email',
            },
            givenName: {
                type: 'string',
                minLength: 1
            },
            familyName: {
                type: 'string',
                minLength: 1
            },
            currentPassword: {
                type: 'string',
                minLength: 0,
                optional: true
            },
            pasword: {
                type: 'string',
                minLength: 0,
                optional: true
            },
            confirmPassword: {
                type: 'string',
                minLength: 0,
                optional: true
            }
        }
    }

    const body = req.body;
    const validated = inspector.validate(validation, body);

    if(!validated.valid) {
        return res.status(400).json({
            code: 0,
            message: 'INVALID REQUEST'
        });
    }

    const account = await Account.findById(req.user._id);

    const hash = account.password;

    // check password
    if(body.currentPassword) {
       
        // password not provided
        if(body.password === "" || body.confirmPassword === "" 
            || !body.password || !body.confirmPassword) {
            return res.status(400).json({
                code: 0,
                message: 'INVALID REQUEST'
            });
        }
        
        // password does not match
        if(body.password !== body.confirmPassword) {
            return res.status(400).json({
                code: 1,
                message: 'CONFIRM PASSWORD'
            });
        }

        // compare the password
        const compare = await compareHash(hash, body.currentPassword);

        // compare failed
        if(!compare) {
            return res.status(400).json({
                code: 2,
                message: 'PASSWORD DOES NOT MATCH'
            });
        }

        if(account.password.length < 5) {
            return res.status(400).json({
                code: 3,
                message: 'PASSWORD TOO SHORT'
            });
        }

        account.password = await generateHash(body.password);
    }

    const currentEmail = req.user.common_profile.email;

    // email has changed
    if(body.email !== currentEmail) {
        const duplicate = await Account.findUserByEmail(body.email);
        if(duplicate) {
            return res.status(400).json({
                code: 4,
                message: 'THAT EMAIL EXISTS'
            });
        }
    }

    account.common_profile.email = body.email;
    account.common_profile.familyName = body.familyName;
    account.common_profile.givenName = body.givenName;

    // image not null
    if(body.image) {
        const fileExtension = body.image.match(/data:image\/(.*);/);
        if(!fileExtension) {
            return res.status(400).json({
                code: 0,
                message: 'INVALID REQUEST'
            });
        }
        const data = body.image.replace(/^data:image\/\w+;base64,/, '');
        const buf = new Buffer(data, 'base64');
        const name = shortid.generate() + '.' + fileExtension[1];
        account.common_profile.thumbnail = '/thumbnails/'+name;
        fs.writeFile('./thumbnails/' + name, buf, () => {});
    }

    await account.save();
    cache.passport.del(account._id.toString());

    return res.json({
        success: true
    });


};


// PATCH /api/mypage/channel
export const updateChannelSetting = async (req, res) => {
    if (!req.user) {
        return res.status(403).json({
            code: -1,
            error: 'not logged in'
        });
    }

    // validate the data
    const validation = {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                optional: true
            }
        }
    };

    const body = req.body;
    const validated = inspector.validate(validation, body);

    if(!validated.valid) {
        return res.status(400).json({
            code: 0,
            message: 'INVALID REQUEST'
        });
    }

    // if the statusMessage is changed, create a new statusMessage document
    if(req.body.message) {
        await StatusMessage.change({
            accountId: req.user._id, 
            message: body.message
        });
        /*
            create new activity later.
        */
    }


    res.json({
        success: true
    });
}


// DELETE /api/mypage/message
export const clearMessage = async (req, res) => {
    if(!req.user) {
        return res.status(403).json({
            code: -1,
            error: 'not logged in'
        });
    }

    const username = req.user.common_profile.username;
    await Message.clear(username);
    await Activity.clearChatActivity(username);

    return res.json({
        success: true
    });
}

// POST /api/mypage/unregister
export const unregister = async (req, res) => {
    if(!req.user) {
        return res.status(403).json({
            code: -1,
            error: 'not logged in'
        });
    }

    const username = req.user.common_profile.username;

    Message.clear(username);
    Activity.clearChatActivity(username);
    Follow.clear(req.user._id);
    await Account.unregister(req.user._id); 
    

    req.logout();
    res.json({success: true});
}
