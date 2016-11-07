import Message from './../models/message.js';

/* 
    MESSAGES
*/

export const getRecentMsg = async (req, res) => {
    const username = req.params.username;

    try {
        const messages = await Message.getRecent({channel: username});

        res.json({
            messages: messages.reverse()
        });
    } catch (error) {
        throw error;
    }
}

export const getMsgBefore = async (req, res) => {
    const username = req.params.username;
    const cursorId = req.params.cursorId;

    try {
        const messages = await Message.getBefore({channel: username, cursorId});

        res.json({
            messages: messages.reverse()
        });

    } catch (error) {
        throw error;
    }
}

export const getMsgBetween = async (req, res) => {
    const username = req.params.username;
    const startId = req.params.startId;
    const endId = req.params.endId;

    try {
        const messages = await Message.getBetween({channel: username, startId, endId});
        res.json({
            messages: messages.reverse()
        });
    } catch (error) {
        throw error;
    }
}