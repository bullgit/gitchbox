var Gitter = require('node-gitter');
var Twitter = require('twitter');
var Firebase = require('firebase');

// get configuration infos from config.js file
// if non available, copy config.example.js and fill out the
var config = require('./config.js');

var gitter = new Gitter(config.gitter.token);
var twitter = new Twitter({
  consumer_key: config.twitter.api.consumer_key,
  consumer_secret: config.twitter.api.consumer_secret,
  access_token_key: config.twitter.api.access_token_key,
  access_token_secret: config.twitter.api.access_token_secret
});
var jukes = new Firebase(config.firebase.url + '/' + config.firebase.name);
jukes.authWithCustomToken(config.firebase.secret, function(error, authData) {
  if (error) {
    console.log("Firebase login Failed!");
  } else {
    console.log("Firebase login Succeeded!");
  }
});

// gitter room name from config gets joined, to recieve the room id on start
gitter.rooms.join( config.gitter.room.name , function(err, room) {

  if (err) {
    console.log('Not possible to join the room: ', err);
    return;
  }

  config.gitter.room.id = room.id;

  // start the message listener
  listenToMessages();

})

function listenToMessages () {

  gitter.rooms.find(config.gitter.room.id).then(function(room) {

    var events = room.streaming().chatMessages();

    // The 'snapshot' event is emitted once, with the last messages in the room
    events.on('snapshot', function(snapshot) {
      console.log(snapshot.length + ' messages in the snapshot');
    });

    // event gets called, when a new message gets written in the configured channel
    events.on('chatMessages', function(message) {

      // the bot only tweets new messages, no updates or other changes
      if (message.operation === 'create') {

        var data = message.model;
        var urls = data.urls;

        // urls represents an array with all urls in the send message
        // if there is more then 0 urls, then use the first one
        if (urls.length > 0) {

          var id = data.id;
          var link = urls[0].url;
          var fullname = data.fromUser.displayName;
          var username = data.fromUser.username;

          var sent = data.sent;
          var d = new Date(sent);
          var time = d.getTime();

          // the tweet gets composed from the template
          // to change it change it in the config file
          var tweet = config.template({ link: link });

          // juke is the data which will be sent to the firebase instance
          var juke = {
            id: id,
            link: link,
            fullname: fullname,
            username: username,
            time: time
          }

          twitter.post('statuses/update', { status: tweet }, function(error, tweet, response){

            if (error) {
              console.log(error);
            } else {
              console.log('Tweet successfully sent and viewable at https://twitter.com/' + config.twitter.accountname + '/status/' + tweet.id_str);
            }

          });

          jukes.push(juke);

        }

      }

    });
  });

}
