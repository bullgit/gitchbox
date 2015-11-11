var Handlebars = require('handlebars');

var config = {

  // gitter settings for retrieving messages
  gitter: {
    // gitter token, can be retrieved from https://developer.gitter.im/apps
    token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',

    room: {
      // name of the gitter room, you want to retrieve the messages
      name: 'bullgit/bombing'
    }

  },

  // twitter settings for tweeting song
  twitter: {

    // get these values by creating an twitter app on https://apps.twitter.com
    api: {
      consumer_key: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
      consumer_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      access_token_key: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      access_token_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    },

    // name of account, from which the bot will tweet
    accountname: 'awesomename'

  },

  // firebase settings for saving the songs to a firebase instance
  firebase: {

    // url of your firebase instance in form of https://<YOUR FIREBASE>.firebaseio.com
    url: 'https://example.firebaseio.com',

    // name of the child reference
    name: 'test',

    // a secret of your firebase instance, available at the secret panel in the dashboard
    secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

  },

  // template of the tweet, use {{link}} where the link should be placed
  template: Handlebars.compile('{{link}} #awesomehashtag')

}

module.exports = config;
