'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateHash = generateHash;
exports.compareHash = compareHash;

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateHash(password) {
    // make a promisie
    return new Promise((resolve, reject) => {
        _bcryptjs2.default.hash(password, 8, (err, hash) => {
            if (err) {
                // error occurred
                return reject(err);
            }
            resolve(hash);
        });
    });
}

function compareHash(hash, password) {
    return new Promise((resolve, reject) => {
        _bcryptjs2.default.compare(password, hash, (err, result) => {
            if (err) {
                // error occured
                return reject(err);
            }
            resolve(result); // true or false
        });
    });
}