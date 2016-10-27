export const client = {
    ENTER: "ENTER",
    AUTH: "AUTH",
    MSG: "MSG"
}

export const server = {
    ERROR: "ERROR", // notify error
    JOIN: "JOIN", // notify user join after authentication
    MSG: "MSG", // notify new messages
    LEAVE: "LEAVE", // notify leave
    SUCCESS: { // sending success packet to single socket
        ENTER: "SUCCESS_ENTER",
        AUTH: "SUCCESS_AUTH",
        MSG: "SUCCESS_MSG"
    }
}