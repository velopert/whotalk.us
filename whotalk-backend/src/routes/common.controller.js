import Visit from '../models/visit';
import Favorite from '../models/favorite';

// GET /api/common/recent-visits
export const getRecentVisits = async (req, res) => {
    if(!req.user) {
        return res.status(403).json({
            error: 'not logged in'
        });
    }

    let recentVisits = await Visit.get(req.user._id);
    recentVisits = recentVisits.map(
        visit => visit.visitedChannel
    );

    res.json({
        recentVisits
    });
}

// GET /api/common/favorite-channels
export const getFavoriteChannels = async (req, res) => {
    if(!req.user) {
        return res.status(403).json({
            error: 'not logged in'
        });
    }

    let favoriteChannels = await Favorite.list(req.user._id);
    favoriteChannels = favoriteChannels.map(
        channel => channel.favoriteChannel
    );

    res.json({
        favoriteChannels
    });

}

