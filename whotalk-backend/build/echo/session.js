'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _cache = require('./../helpers/cache.js');

var _cache2 = _interopRequireDefault(_cache);

var _session = require('./../models/session.js');

var _session2 = _interopRequireDefault(_session);

var _account = require('./../models/account.js');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const session = {};

// get username by sessionId
session.get = sessionID => {
    var sess, s, account;
    return _regenerator2.default.async(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
            case 0:
                if (!_cache2.default.session.has(sessionID)) {
                    _context.next = 2;
                    break;
                }

                return _context.abrupt('return', _cache2.default.session.get(sessionID));

            case 2:
                _context.next = 4;
                return _regenerator2.default.awrap(_session2.default.findOne({ _id: sessionID }).exec());

            case 4:
                sess = _context.sent;

                if (sess) {
                    _context.next = 7;
                    break;
                }

                return _context.abrupt('return', null);

            case 7:
                s = JSON.parse(sess.session);

                // not logged in

                if (s.passport) {
                    _context.next = 10;
                    break;
                }

                return _context.abrupt('return', null);

            case 10:
                if (!_cache2.default.passport.has(s.passport.user)) {
                    _context.next = 14;
                    break;
                }

                account = _cache2.default.passport.get(s.passport.user);
                _context.next = 17;
                break;

            case 14:
                _context.next = 16;
                return _regenerator2.default.awrap(_account2.default.findById(s.passport.user));

            case 16:
                account = _context.sent;

            case 17:
                if (account) {
                    _context.next = 19;
                    break;
                }

                return _context.abrupt('return', null);

            case 19:

                // store the username in cache
                _cache2.default.session.set(sessionID, account.common_profile.username);

                return _context.abrupt('return', account.common_profile.username);

            case 21:
            case 'end':
                return _context.stop();
        }
    }, null, undefined);
};

// gets anonymous username

// check cache whether it has one
// if (cache.session.has(sessionID)) {
//     return cb(cache.session.get(sessionID));
// }

// let accountId = null;
// // if not, do some mongo works
// Session
//     .findOne({_id: sessionID})
//     .exec()
//     .then((sess => {
//         console.log(sess);
//         // does not have session
//         if (!sess) {
//             cb(null);
//         }

//         const s = JSON.parse(sess.session);
//         // not logged in
//         if (!s.passport) {
//             cb(null);
//         }

//         accountId = s.passport.user;

//         // check whether it exists in passport cache
//         if (cache.passport.has(accountId)) {
//             cb(cache.passport.get(accountId));
//         }

//         return Account
//             .findById(accountId)
//             .exec();
//     }))
//     .then(account => {
//         cache
//             .passport
//             .set(accountId, account);
//         cache
//             .session
//             .set(sessionID, account.common_profile.username);
//         cb(account.common_profile.username);
//     })
//     .catch((err) => {
//         console.log(err);
//         cb(null);
//     });
session.getAnonymousName = (sessionID, channel) => {
    const hash = (0, _md2.default)(sessionID + channel);
    // alphabet only
    return hash.substr(0, 5).split('').map(value => {
        const charCode = value.charCodeAt(0);
        if (charCode <= 57) {
            return String.fromCharCode(charCode + 49);
        } else {
            return String.fromCharCode(charCode + 10);
        }
    }).join('');
};

exports.default = session;