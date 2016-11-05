"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const client = exports.client = {
    ENTER: "ENTER",
    AUTH: "AUTH",
    MSG: "MSG"
};

const server = exports.server = {
    ERROR: "ERROR", // notify error
    JOIN: "JOIN", // notify user join after authentication
    MSG: "MSG", // notify new messages
    LEAVE: "LEAVE", // notify leave
    SUCCESS: { // sending success packet to single socket
        ENTER: "SUCCESS_ENTER",
        AUTH: "SUCCESS_AUTH",
        MSG: "SUCCESS_MSG"
    }
};