//-------------------------------------Twitter------------------------------//
//Load Twit Package
var Twit = require('twit')
//Load keys 
var keys = require('./key.js')
var T = new Twit(keys)
var numTweets = 2;
//Set first user's input as the command
var command = process.argv[2];

//Retrieve latest tweets and when they're posted
if(command == "my-tweets"){

	if(process.argv.length > 3){
		numTweets = process.argv[3];
	}
	console.log("Here are the tweets:\n");

	T.get('statuses/user_timeline', { screen_name: 'bhhuynh95', count: numTweets},  function (err, tweets, response) {
		for(var i=0; i<numTweets; i++){

			console.log("On: "+tweets[i].created_at)
			console.log("You tweeted: "+tweets[i].text+"\n")
		}
	})
}


var tweet = process.argv[3];
//Tweet!
if(command == "post-tweet"){
	if(process.argv.length > 4){
		console.log("Please put your tweets in brackets i.e 'this is a tweet'")
	}
	else{
		T.post('statuses/update', { status: tweet }, function(err, data, response) {
			if(err){
				console.log("ERROR")
			}
			else{
				console.log("Tweet successful!")
			}
		})
	}
}
//------------------------------End of Twitter------------------------------//



//-------------------------------------Spotify------------------------------//
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: <your spotify client id>,
  secret: <your spotify client secret>
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});

//--------------------------------End of  Spotify------------------------------//