import Account from './../models/account.js'

// GET /valid/:username
export const valid = (req, res) => {
    Account
        .findUser(req.params.username)
        .then(account => {
            if (account) {
                res.json({valid: true});
            } else {
                res.json({valid: false});
            }
        });
}