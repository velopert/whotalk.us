'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _channelController = require('./channel.controller.js');

var controller = _interopRequireWildcard(_channelController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

router.get('/valid/:username', controller.valid);

router.get('/get-recent/:username', controller.getRecent);

router.get('/thumbtest', (req, res) => {
    res.redirect('https://avatars0.githubusercontent.com/u/17202261?v=2&s=150');
});

router.get('/errtest', (req, res) => {
    var e = new Error();
    throw e;
});

exports.default = router;