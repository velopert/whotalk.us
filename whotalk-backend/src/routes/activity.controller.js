import Activity from '../models/activity';
import Message from '../models/message';
import Follow from '../models/follow';
import Account from '../models/account';


async function processActivities({activities, accountId}) {
    /* 
        chat -> get the message lists
        follow -> get whether the user follows the user(s)
    */

    // process chatActivities where lastId is undefined

    // get indexes of chatActivites where alstId is undefined
    // and put it in indexesToProcess

    const indexesToProcess = [];
    const chatActivityIndexes = [];
    const followActivityIndexes = [];

    activities.forEach(
        (activity, i) => {
            if(activity.type === 'CHAT') {
                chatActivityIndexes.push(i);
                if(!activity.payload.chat.lastId) {
                    indexesToProcess.push(i);
                }
            } else if (activity.type === 'FOLLOW') {
                followActivityIndexes.push(i);
            }
        }
    );


    // create an array of promises... that finds the sleep message
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
            activities[chatActivityIndexes[index]].payload.chatData = chatData;
        }
    );

    /* handle follow activities */
    for(let i = 0 ; i < followActivityIndexes.length; i++) {
        // for every followActivities..
        const index = followActivityIndexes[i];
        const followees = activities[index].payload.follow.followee;

        // // get AccountIds
        // const getAccountsPromises = followees.map(
        //     (followee) => {
        //         return Account.findUser(followee.username);
        //     }
        // );

        // const accounts =  await Promise.all(getAccountsPromises);
        // const accountIds = accounts.map(
        //     account => account._id
        // );
        const accountIds = followees.map(
            followee => followee._id
        );

        // for(let j = 0; j < followees.length; j++) {
        //     const account = await Account.findUser(followees[j].username);
        //     accountIds.push(account._id);
        // }

        // find common followers
        const common = await Follow.getCommonFollowers({userId: accountId, userIdArray: accountIds});

        // compare and set 'following' to true
        common.forEach(
            (follow) => {
                for(let j = 0; j < followees.length; j++) {
                    if(follow.followee.equals(accountIds[j])) {
                        activities[index].payload.follow.followee[j].following = true;
                    }
                }
            }
        );
    }
    

    return {
        activities,
        update: lastIds.map(
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
        )
    }
}


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

    const result = await processActivities({activities, accountId});

    // return data to the user
    res.json({
        activities: result.activities
    });

    await result.updates;
}

// GET /api/activity/before/:activityId

export const getActivityBefore = async (req, res) => {
    // if not logged in, return error
    if (!req.user) {
        return res
            .status(401)
            .json({code: 0, message: 'NOT LOGGED IN'});
    }

    // get the 20 recent activities
    const accountId = req.user._id;
    let activities = await Activity.getActivityBefore({
        subscriberId: accountId,
        activityId: req.params.activityId
    });

    const result = await processActivities(activities);

    // return data to the user
    res.json({
        activities: result.activities
    });

    await result.updates;
}