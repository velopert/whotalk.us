module.exports = {
  'appID' : '2114304178795129',
  'appSecret' : process.env.FACEBOOK_SECRET,
  'callbackURL' : 'https://whotalk.us/api/authentication/facebook/callback',
  'profileFields': ['id', 'name', 'emails', 'friends', 'gender']
}


