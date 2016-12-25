import Account from './../models/account.js'
import inspector from 'schema-inspector';
import { generateHash, compareHash } from './../helpers/bcrypt';
import cache from './../helpers/cache';

// GET /api/mypage/account

export const getAccountSetting = (req, res) => {
    if (!req.user) {
        return res.status(403).json({
            error: 'not logged in'
        });
    }

    return res.json({
        account: req.user.common_profile
    });
}

// PATCH /api/mypage/account



export const updateAccountSetting = async (req, res) => {

    if (!req.user) {
        return res.status(403).json({
            error: 'not logged in'
        });
    }

    /* validate the data */
    const validation = {
        type: 'object',
        properties: {
            email: {
                type: 'email'
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
                minLength: 1,
                optional: true
            },
            pasword: {
                type: 'string',
                minLength: 1,
                optional: true
            },
            confirmPassword: {
                type: 'string',
                minLength: 1,
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
        console.log(hash, body.currentPassword);
        
        // password not provided
        if(!body.password || !body.confirmPassword) {
            return res.status(400).json({
                code: 0,
                message: 'INVALID REQUEST'
            });
        }
        
        // password does not match
        if(body.password === body.confirmPassword) {
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

        account.password = await generateHash(body.password);
    }

    const currentEmail = req.user.common_profile.email;

    // email has changed
    if(body.email !== currentEmail) {
        const duplicate = await Account.findUserByEmail(body.email);
        if(duplicate) {
            return res.status(400).json({
                code: 3,
                message: 'THAT EMAIL EXISTS'
            });
        }
    }

    account.common_profile.email = body.email;
    account.common_profile.familyName = body.familyName;
    account.common_profile.givenName = body.givenName;

    await account.save();
    cache.passport.del(account._id.toString());

    return res.json({
        success: true
    });
};