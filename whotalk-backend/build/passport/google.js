'use strict';

module.exports = {
  'appID': '636335359716-a3gq8ukqajgs8k1ffavs0jc5kom2ehlf.apps.googleusercontent.com',
  'appSecret': process.env.GOOGLE_SECRET,
  'callbackURL': 'http://localhost:4000/api/authentication/google/callback'
};