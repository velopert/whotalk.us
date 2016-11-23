import Activity from '../models/activity';
import Message from '../models/message';


// GET /api/activity/
export const getInitialActivity = async (req, res) => {

    // if not logged in, return error

    if (!req.user) {
        return res
            .status(401)
            .json({code: 0, message: 'NOT LOGGED IN'});
    }

    // get the 20 recent activities
    const accountId = req.user._id;
    let activities = await Activity.getInitialActivity(accountId);


    /* handle chat */

    // process chatActivities where lastId is undefined

    // get indexes of chatActivites where alstId is undefined
    // and put it in indexesToProcess

    const indexesToProcess = [];
    const chatActivityIndexes = [];

    activities.forEach(
        (activity, i) => {
            if(activity.type === 'CHAT') {
                chatActivityIndexes.push(i);
                if(!activity.payload.chat.lastId) {
                    indexesToProcess.push(i);
                }
            }
        }
    );


    // create an array of promises
    const promises = indexesToProcess.map(
        (index) => {
            return Message.getSleepMessageAfter({
                channel: activities[index].payload.chat.channel,
                messageId: activities[index].payload.chat.initId
            })
        }
    );

    // wait until all the promises resolve
    const lastIds = await Promise.all(promises);

    // store lastIds in result (before it saves)
    indexesToProcess.forEach(
        (index, i) => {
            const lastId = lastIds[i];
            if(lastId) {
                activities[index].payload.chat.lastId = lastId._id;
            } else {
                activities[index].payload.chat.lastId = null;
            }
            
        }
    );

    

    // get the chatData 
    const chatPromises = chatActivityIndexes.map(
        (index) => {
            const activity = activities[index];
            // check for cache... (to be implemented)
            return Message.getMessagesForActivity({
                channel: activity.payload.chat.channel,
                initId: activity.payload.chat.initId,
                lastId: activity.payload.chat.lastId
            });
        }
    );

    const chatStorage = await Promise.all(chatPromises);

    chatStorage.forEach(
        (chatData, index) => {
            activities[index].payload.chatData = chatData;
        }
    );

    // return data to the user
    res.json({
        activities: activities
    });


    // update the database    
    const updates = lastIds.map(
        (lastId, i) => {
            if(lastId) {
                return Activity.setLastId({
                    activityId: activities[indexesToProcess[i]]._id,
                    messageId: lastId._id
                });
            } else {
                return Promise.resolve();
            }
        }
    );

    await updates;
}