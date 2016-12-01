module.exports = {
  'appID' : '2114304178795129',
  'appSecret' : process.env.FACEBOOK_SECRET,
  'callbackURL' : 'http://localhost:4000/api/authentication/facebook/callback',
  'profileFields': ['id', 'name', 'emails', 'friends', 'gender']
}


