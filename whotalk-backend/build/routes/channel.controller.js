'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRecent = exports.valid = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _account = require('./../models/account.js');

var _account2 = _interopRequireDefault(_account);

var _message = require('./../models/message.js');

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// GET /valid/:username
const valid = exports.valid = (req, res) => {
    _account2.default.findUser(req.params.username).then(account => {
        if (account) {
            const { familyName, givenName, thumbnail } = account.common_profile;
            res.json({
                valid: true,
                info: {
                    familyName,
                    givenName,
                    thumbnail
                }
            });
        } else {
            res.status(404).json({ code: 0, message: 'USER NOT FOUND' });
        }
    });
};

const getRecent = exports.getRecent = (req, res) => {
    var username, messages;
    return _regenerator2.default.async(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
            case 0:
                username = req.params.username;
                _context.prev = 1;
                _context.next = 4;
                return _regenerator2.default.awrap(_message2.default.getRecent({ username }));

            case 4:
                messages = _context.sent;


                res.json({
                    messages: messages.reverse()
                });
                _context.next = 11;
                break;

            case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](1);
                throw _context.t0;

            case 11:
            case 'end':
                return _context.stop();
        }
    }, null, undefined, [[1, 8]]);
};