//Set first user's input as the command
var command = process.argv[2];

var fs = require("fs");
//Append log to txt file
var logger = fs.createWriteStream('log.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})


//Date and time for logging


function getDateTime() {

	var date = new Date();

	var hour = date.getHours();
	hour = (hour < 10 ? "0" : "") + hour;

	var min  = date.getMinutes();
	min = (min < 10 ? "0" : "") + min;

	var sec  = date.getSeconds();
	sec = (sec < 10 ? "0" : "") + sec;

	var year = date.getFullYear();

	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;

	var day  = date.getDate();
	day = (day < 10 ? "0" : "") + day;

	return year + "/" + month + "/" + day + "-------" + hour + ":" + min + ":" + sec;

}

var currentTime = getDateTime();

//Functions for different tasks
function myTweets(numTweets){

	if(process.argv.length > 3){
		numTweets = process.argv[3];
	}
	console.log("Here are the tweets:\n");

	T.get('statuses/user_timeline', { screen_name: 'bhhuynh95', count: numTweets},  function (err, tweets, response) {
		logger.write("\n"+currentTime+"\n");
		logger.write(">>node my-tweets\n");
		for(var i=0; i<numTweets; i++){

			console.log("On: "+tweets[i].created_at)
			console.log("You tweeted: "+tweets[i].text+"\n")
			logger.write("On: "+tweets[i].created_at+"\n")
			logger.write("You tweeted: "+tweets[i].text+"\n\n")

		}
	})
}

function postTweet(tweet){
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
				logger.write("\n"+currentTime+"\n");
				logger.write(">>node post-tweet\n");
				logger.write("Tweet successful!\n")
			}
		})
	}
}


function spotifyThis(songQuery){
	if(process.argv.length > 4){
		console.log("Please put your search query in brackets i.e 'Blank Space'")
		return false;
	}
	if(process.argv.length > 3){
		songQuery = songQuery;
	}
	spotify.search({ type: 'track', query: songQuery, limit: 2}, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}

		console.log("Artist: "+data.tracks.items[0].artists[0].name);
		console.log("Song: "+data.tracks.items[0].name); 
		console.log("Spotify URL: "+data.tracks.items[0].external_urls.spotify);
		console.log("Album: "+data.tracks.items[0].album.name);
		logger.write("\n\n"+currentTime+"\n");

		if(process.argv[3]==undefined){
			logger.write(">>node spotify-this-song ");
		}
		else{
			logger.write(">>node spotify-this-song "+process.argv[3]);
		}

		logger.write("\nArtist: "+data.tracks.items[0].artists[0].name);
		logger.write("\nSong: "+data.tracks.items[0].name); 
		logger.write("\nSpotify URL: "+data.tracks.items[0].external_urls.spotify);
		logger.write("\nAlbum: "+data.tracks.items[0].album.name);
	});
}

function movieThis(movieName){
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body) {
  // If the request is successful
  if (!error && response.statusCode === 200) {
    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Title: "+JSON.parse(body).Title);
    console.log("Year: "+JSON.parse(body).Year);
    console.log("IMDB Rating: "+JSON.parse(body).imdbRating);
    console.log("Made in: "+JSON.parse(body).Country);
    console.log("Language: "+JSON.parse(body).Language);
    console.log("Plot: "+JSON.parse(body).Plot);
    console.log("Actors: "+JSON.parse(body).Actors);
    console.log("Website: "+JSON.parse(body).Website);
    logger.write("\n\n"+currentTime+"\n");
    if(process.argv[3]==undefined){
			logger.write(">>node movie-this ");
		}
		else{
			logger.write(">>node movie-this "+process.argv[3]);
		}
    logger.write("\nTitle: "+JSON.parse(body).Title);
    logger.write("\nYear: "+JSON.parse(body).Year);
    logger.write("\nIMDB Rating: "+JSON.parse(body).imdbRating);
    logger.write("\nMade in: "+JSON.parse(body).Country);
    logger.write("\nLanguage: "+JSON.parse(body).Language);
    logger.write("\nPlot: "+JSON.parse(body).Plot);
    logger.write("\nActors: "+JSON.parse(body).Actors);
    logger.write("\nWebsite: "+JSON.parse(body).Website);
}
});
}

//-------------------------------Text file Command------------------------------//



if(command == "do-what-it-says") {

// This block of code will read from the "movies.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function(error, data) {
  // If the code experiences any errors it will log the error to the console.
  if (error) {
  	return console.log(error);
  }

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  switch(dataArr[0]) {
  	case 'my-tweets':
  	myTweets(3);
  	break;

  	case 'post-tweet':
  	postTweet(dataArr[1]);
  	break;

  	case 'spotify-this-song':
  	console.log(dataArr.length);
  	if(dataArr.length==1){
  		spotifyThis('the sign ace of base');
  	}
  	else{
  		spotifyThis(dataArr[1]);
  	}
  	break;

  	case 'movie-this':
  	console.log(dataArr.length)
  	if(dataArr.length==1){
  		movieThis('Mr. Nobody');
  	}
  	else{

  		nodeArgs = dataArr[1].split(" ");
  		var movieName = "";	
  		for (var i = 0; i < nodeArgs.length; i++) {
  			if (i > 0 && i < nodeArgs.length) {
  				movieName = movieName + "+" + nodeArgs[i];
  			}
  			else {
  				movieName += nodeArgs[i];
  			}
  		}
  		movieThis(movieName);
  	}
  	break;
  	default:
  }
});
}

//--------------------------End of Text file Command------------------------------//




//-------------------------------------Twitter------------------------------//
//Load Twit Package
var Twit = require('twit')
//Load keys 
var keys = require('./key.js')
var T = new Twit(keys)



//Retrieve latest tweets and when they're posted
if(command == "my-tweets"){
	myTweets(20);

}


var tweet = process.argv[3];

if(command == "post-tweet"){
	postTweet(tweet);
}
//------------------------------End of Twitter------------------------------//



//-------------------------------------Spotify------------------------------//
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
	id: '9cc8dc6b13a5412b972d0f1560aa256e',
	secret: '6f29276c71ce434d904b011a6fbe53c9'
});


if(command == "spotify-this-song") {

	if(process.argv.length > 3){
		spotifyThis(process.argv[3]);
	}
	else{
		spotifyThis('the sign ace of base');
	}
}
//--------------------------------End of  Spotify------------------------------//




//-------------------------------------OMDB------------------------------//
var request = require("request");
// Store all of the arguments in an array
var nodeArgs = process.argv[3];


// Create an empty variable for holding the movie name
var movieName = "Mr. Nobody";
if(process.argv.length > 3){
	nodeArgs = nodeArgs.split(" ");
	movieName = "";	
	for (var i = 0; i < nodeArgs.length; i++) {
		if (i > 0 && i < nodeArgs.length) {
			movieName = movieName + "+" + nodeArgs[i];
		}
		else {
			movieName += nodeArgs[i];
		}
	}

}



// Then run a request to the OMDB API with the movie specified



if(command == "movie-this") {

	movieThis(movieName);
}
//-------------------------------End of OMDB------------------------------//


