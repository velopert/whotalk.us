import Visit from '../models/visit';
import Favorite from '../models/favorite';
import facebook from '../helpers/facebook';
import Account from '../models/account';

// GET /api/common/sidebar-links
export const getSidebarLinks = async (req, res) => {
    if (!req.user) {
        return res.status(403).json({
            error: 'not logged in'
        });
    }

    let recentVisits = await Visit.get(req.user._id);
    recentVisits = recentVisits.map(
        visit => visit.visitedChannel
    );

    let favoriteChannels = await Favorite.list(req.user._id);
    favoriteChannels = favoriteChannels.map(
        channel => channel.favoriteChannel
    );

    res.json({
        recentVisits,
        favoriteChannels
    });
}

// GET /api/common/friend-list

export const getFriendList = async (req, res) => {
    const response = await facebook.api({
        path: '/874721505962690/friends'
    })

    res.json(response.data);
}

// FB.api(
//   '/874721505962690/friends',
//   'GET',
//   {},
//   function(response) {
//       // Insert your code here
//   }
// );


// GET /api/common/search-user/:username

export const getSearchUser = async (req, res) => {
    const username = req.params.username;

    if(username.length < 1) {
        return res.json({
            result: []
        });
    }

    const accounts = await Account.search(username); 

    return res.json({
        result: accounts.map(
            account=>account.common_profile.username
        )
    });
    
    
}

// GET /api/common/thumbnail

export const getThumbnail = async(req, res) => {
    const username =req.params.username;

    const account = await Account.findUser(username);

    let url = req.protocol + '://' + req.get('host');
    //res.json({user: req.user});
    
    if (process.env.NODE_ENV === 'development') {
        url = url.replace(process.env.PORT, process.env.DEVPORT);
    }

    if(!account) {
        return res.redirect('https://imgh.us/x-icon.svg');
    }

    const thumbnail = account.common_profile.thumbnail;

    if(thumbnail === 'none') {
        return res.redirect('https://imgh.us/user_11.svg')
    } else {
        return res.redirect('https://whotalk.us' + thumbnail);
    }

    
}