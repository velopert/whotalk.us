"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lruCache = require("lru-cache");

var _lruCache2 = _interopRequireDefault(_lruCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const options = {
    max: 500,
    length: (n, key) => n * 2 + key.length,
    maxAge: 1000 * 60 * 60
};

const cache = {
    passport: (0, _lruCache2.default)(options),
    session: (0, _lruCache2.default)(options)
};

console.log("Cache is initialized");

exports.default = cache;