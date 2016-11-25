import Visit from '../models/visit';


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
    )

    res.json({
        recentVisits
    });
}
