import Account from './../models/account.js'

// GET /api/mypage/account
export const getAccountSetting = (req, res) => {
    if (!req.user) {
        return res.status(403).json({
            error: 'not logged in'
        });
    }

    return res.json({
        common_profile: req.user.common_profile
    })
}