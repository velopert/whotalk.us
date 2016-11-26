import Visit from '../models/visit';
import Favorite from '../models/favorite';

// GET /api/common/sidebar-links
export const getSidebarLinks = async (req, res) => {
    if(!req.user) {
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