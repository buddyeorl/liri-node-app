var inquirer = require('inquirer');
inquirer.registerPrompt('recursive', require('inquirer-recursive'));
var generalInfo=require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var imdb = require('imdb-api');
var request = require('request');
var userInput = process.argv[3];

function mainMenu()
{

inquirer.prompt(
	[
		// {
		//     type: 'input',
		//     name: 'name',
		//     message: 'Whats your name?',
		//     default: true
  // 		},
		// {
		//     type: 'input',
		//     name: 'age',
		//     message: 'tell me your age?',
		//     default: true
  // 		},
		// {
		// 	type: 'confirm',
		// 	name: 'kindOfPerson',
		// 	message: 'Are you a yes person?',
		// 	default: true
		// },
		{

					type: 'list',
		    		name: 'trickyQuestion',
		    		message: '\n\n What do you want to check???',
		    		choices: ['Check my boring tweets?', 'check a song?', 'check a movie?']
		}

	]).then(function (inquirerResponse) {
    // Use user feedback for... whatever!!
    if (inquirerResponse.trickyQuestion === 'Check my boring tweets?')
    {
    	twitterStatuses();
    	console.log("\nyour Name is: " + inquirerResponse.trickyQuestion);
    }
    if (inquirerResponse.trickyQuestion === 'check a song?')
    {
    	console.log("\nyour Name is: " + inquirerResponse.trickyQuestion);
    }
    if (inquirerResponse.trickyQuestion === 'check a movie?')
    {
    	console.log("\nyour Name is: " + inquirerResponse.trickyQuestion);
    }

	}).then(function(){return mainMenu();}); 
	
}




 
mainMenu();








function twitterStatuses()
{
	var client = new Twitter(generalInfo.twitterKeys); 
	var params = {screen_name: 'buddyeorl'};
	client.get('statuses/user_timeline', params, function(error, body, response) {
	  if (!error) 
	  {
		  for (var i=0; i < body.length; i++)
		  {
		  	console.log(body[i].text + "\n\n");
		  	if (i=== (body.length - 1))
		  	{
		  		console.log("\n\n PRESS 'UP' OR 'DOWN' KEY TO CONTINUE...");
		  	}
		  }
	  }
	});
}

function spotifySong(songName) 
{ 
	var spotify = new Spotify(generalInfo.spotifyKeys);
	 
	spotify.search({ type: 'track', query: songName }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	  		for (var i=0; i<data.tracks.items.length;i++)
	  		{
	  			console.log(data.tracks.items[i].album.artists[0].name); // artist
	  			console.log(data.tracks.items[i].name); // song's name
	  			console.log(data.tracks.items[i].album.artists[0].external_urls.spotify); //a preview link of the song from spotify
	  			console.log(data.tracks.items[i].album.name); //album name

	  		}
	});
}


function imdbMovie(movieName)
{
	imdb.get(movieName, generalInfo.imdbKeys).then(function (data){
		// console.log(data); prints full movie data
		console.log(data.title); //prints the title
		console.log(data.year); // prints the year
		console.log(data.ratings[0].Value); //imdb rating
		console.log(data.ratings[1].Value); // Rotten Tomatoes value
		console.log(data.country); // Country where the movie was produced
		console.log(data.languages); // Language of the movie
		console.log(data.plot); // Plot of the Movie
		console.log(data.actors); // Actors in the movie
	});
}
