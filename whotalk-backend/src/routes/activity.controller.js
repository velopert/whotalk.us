import Activity from '../models/activity';

// GET /
export const getActivity = async (req, res) => {
    res.json({
        success: true
    });
}