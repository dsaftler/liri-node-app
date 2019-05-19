
// omdbapi key: "http://www.omdbapi.com/?i=tt3896198&apikey=4b06ca2e"
//  // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
// var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";

// cSpell:ignore spotify, omdbapi, bandsintown, liri, codingbootcamp, wholestring,imdb,datetime,apikey,getNameOf,Nameof
const axios = require("axios");
const spotify = require("node-spotify-api");
const moment = require("moment");
const inquirer = require("inquirer");
require("dotenv").config();
const fs = require("fs");
var keys = require("./keys.js")
var command,target
var inputs = process.argv.slice(2);
console.log(inputs)
command = inputs[0]
target = ''
for (var i = 1; i<inputs.length; i++) {
  if (i > 2 && i <inputs.length) {
    target = target + "+" + inputs[i];
  } else {
    target += inputs[i];
  }
}

function liriBot(command,target){

  switch (command) {
    case 'spotify-this-song':
      console.log("Spotify: " + target)
      song();
      break;
    case 'movie-this':
      console.log("Movie: " + target)
      movie();
      break;
    case 'concert-this':
      console.log("Concert: " + target)
      concert();
      break;
    case 'do-what-it-says':
      console.log("Do this");
      doIt();
      break;
    default:
      console.log('does not compute...')
    }


function concert() {
  queryURL = "https://rest.bandsintown.com/artists/" + target + "/events?app_id=codingbootcamp"
axios
.get(queryURL)
.then(function (response) {
  let dateTime = moment(response.datetime).format('dddd,MM/DD,YYYY hh:mm A')
    console.log(`
  Venue: ${response.venue.name}
  Location: ${response.venue.city}, ${response.venue.region} ${response.venue.country}}
  Event Date & Time: ${dateTime}`)
  // venue name 
  // venue location
    // date of event
  })
  .catch(function (error) {
    if (error.response) {
      console.log(`
      Error on Response!
      Status: ${error.response.status}
      Data: ${error.response.data}
    Headers: ${error.response.headers}`);
  } else if (error.request) {
    console.log(`
    Error on Request!
    Error: ${error.request}`);
  } else {
    console.log(`Something went wrong: ${error.message}`);
  }
  });
}
      
function song() {
if (target.length===0){
  target = "the sign ace of base" 
  //The Sign by Ace of Base
};
console.log("Spotify: " + target)
spotify.search({
  type: 'track',
  query: target,
  limit: 1
},
  function (err, data) {
    if (err) {
      return console.log(`Error: ${err}`)
    }
  let spotifyData = data.tracks.items;
  for(let i=0; i<spotifyData.length; i++) {
    console.log(`
    Artist: ${data.tracks.items[i].album.artists[0].name}
    Song: ${data.tracks.items[i].name} 
    Album: ${data.tracks.items[i].album.name}
    Preview Link: ${data.tracks.items[i].external_urls.spotify}`)
  };
  });
}

function movie() {
  // target = getNameof("Movie?")
  console.log("Movie: " + target);
  if (target === '') {
      target = "Mr+Nobody"
    }
    // Title of the movie.
    // Year the movie came out.
    // IMDB Rating of the movie.
    // Rotten Tomatoes Rating of the movie.
    // Country where the movie was produced.
  // Language of the movie.
  // Plot of the movie.
  // Actors in the movie.
  queryURL = "http://www.omdbapi.com/?t=" + target + "&type=movie&y&plot=short&apikey=trilogy"
  axios
  .get(queryURL)
  .then (function (response) {
    console.log(`
    Title: ${response.data.Title}
    Year: ${response.data.Year}
    IMDB Rating: ${response.data.imdbRating}
    Rotten Tomatoes: ${response.data.Ratings[1].Value}
    Country: ${response.data.Country}
    Language: ${response.data.Language}
    Plot: ${response.data.Plot}
    Actors: ${response.data.Actors}`)
    })
  .catch(function (error) {
    if (error.response) {
      console.log(`
      Error on Response!
      Status: ${error.response.status}
      Data: ${error.response.data}
      Headers: ${error.response.headers}`);
    } else if (error.request) {
      console.log(`
      Error on Request!
      Error: ${error.request}`);
    } else {
      console.log(`Something went wrong: ${error.message}`);
    }
  });
}
function doIt() {
fs.readFile('random.txt','utf8',function (err,data){
  if (err){
    return console.log(`Error: ${err}`)
  }
  let args = data.split(",");
  command=args[0];
  target=args[1];
  liriBot(command,target);
});
}
liriBot();
