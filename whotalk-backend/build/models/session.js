'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Session = new _mongoose.Schema({
    _id: String,
    session: String,
    expires: _mongoose.Schema.Types.Mixed
});

exports.default = _mongoose2.default.model('session', Session);