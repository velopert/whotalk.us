'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Follow = new _mongoose.Schema({
    followee: _mongoose.Schema.Types.ObjectId,
    follower: _mongoose.Schema.Types.ObjectId,
    since: { type: Date, default: Date.now },
    end: Date,
    secret: { type: Boolean, default: false }
});

exports.default = _mongoose2.default.model('Follow', Follow);

// Reference: http://blog.mongodb.org/post/61499097398/tracking-twitter-followers-with-mongodb
//https://medium.com/@ravisuhag/follow-schema-for-mongo-db-ffcf83439c91#.fq06wty2c