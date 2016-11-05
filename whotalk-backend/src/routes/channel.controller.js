import Account from './../models/account.js';
import Message from './../models/message.js';

// GET /valid/:username
export const valid = (req, res) => {
    Account
        .findUser(req.params.username)
        .then(account => {
            if (account) {
                const { familyName, givenName, thumbnail } = account.common_profile;
                res.json({
                    valid: true,
                    info: {
                        familyName,
                        givenName,
                        thumbnail
                    }
                });
            } else {
                res.status(404).json({code: 0, message: 'USER NOT FOUND'});
            }
        });
}


export const getRecent = async (req, res) => {
    const username = req.params.username;

    try {
        const messages = await Message.getRecent({username});

        res.json({
            messages: messages.reverse()
        });
    } catch (error) {
        throw error;
    }
}