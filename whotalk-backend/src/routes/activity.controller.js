import Activity from '../models/activity';
import Message from '../models/message';


// GET /api/activity/
export const getInitialActivity = async (req, res) => {
    if (!req.user) {
        return res
            .status(401)
            .json({code: 0, message: 'NOT LOGGED IN'});
    }

    const accountId = req.user._id;
    let activities = await Activity.getInitialActivity(accountId);

    const indexesToProcess = [];

    // activities = activities.map(
    //     (activity, i) => {
    //         if(activity.type === 'CHAT') {
    //             activity.chatData = [];
    //             if(!activity.payload.chat.lastId) {
    //                 indexesToProcess.push(i);
    //             }
    //         }
    //         return activity;
    //     }
    // );

    // get chatActivities where lastId is undefined
    // add the indexes to indexesToProcess
    activities.forEach(
        (activity, i) => {
            if(activity.type === 'CHAT') {
                activity.chatData = [];
                if(!activity.payload.chat.lastId) {
                    indexesToProcess.push(i);
                }
            }
        }
    );

    const promises = indexesToProcess.map(
        (index) => {
            return Message.getSleepMessageAfter({
                channel: activities[index].payload.chat.channel,
                messageId: activities[index].payload.chat.initId
            })
        }
    );

    const lastIds = await Promise.all(promises);

    res.json({
        activities: activities
    });

    // const updates = indexesToProcess.map(
    //     (index, i) => {
    //         if(activities[])
    //         return Activity.setLastId({
    //             activityId: activities[index]._id,
    //         })
    //     }
    // )
    
    const updates = lastIds.map(
        (lastId, i) => {
            if(lastId) {
                return Activity.setLastId({
                    activityId: activities[indexesToProcess[i]]._id,
                    messageId: lastId
                });
            } else {
                return Promise.resolve();
            }
        }
    );

    await updates;
}