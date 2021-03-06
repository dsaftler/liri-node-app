
// omdbapi key: "http://www.omdbapi.com/?i=tt3896198&apikey=4b06ca2e"
// var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";


// cSpell:ignore spotify, omdbapi, bandsintown, liri, codingbootcamp, wholestring,datetime,imdb,apikey
const spotify = require("node-spotify-api");
=======
// cSpell:ignore spotify, omdbapi, bandsintown, liri, codingbootcamp, wholestring,imdb,datetime,apikey,getNameOf,Nameof,omdb
const axios = require("axios");
const Spotify = require("node-spotify-api");

const moment = require("moment");
const inquirer = require("inquirer");
require("dotenv").config();
var keys = require("./keys.js")
const fs = require("fs");

var command,target
inputs=process.argv
command = inputs[2];
// console.log(inputs)

target = ''
for (var i = 3; i < inputs.length; i++) {
  if (i >=3 && i <inputs.length) {
    target += inputs[i]+ ' ';
  } else {
    target = inputs[i];
  }

  switch(command){
    case 'concert-this':
      console.log("Concert: "+target)
      axios.get("https://rest.bandsintown.com/artists/" + target + "/events?app_id=codingbootcamp")
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
        if (error.response){
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
      break;

}

function liriBot(){
  // choices: ["Song via Spotify", "Movie via IMDB", "Concert via BandsInTown", 
  switch (command) {

    case 'spotify-this-song':
    // "Song via Spotify":   
      song();
      break;

    case 'movie-this':
      console.log("Movie: "+ target)
      if (target === ''){
        target = "Mr%20Nobody"
      }
    // Title of the movie.
    // Year the movie came out.
    // IMDB Rating of the movie.
    // Rotten Tomatoes Rating of the movie.
    // Country where the movie was produced.
    // Language of the movie.
    // Plot of the movie.
    // Actors in the movie.
      axios.get("http://www.omdbapi.com/?t=" + target + "&type=movie&y&plot=short&apikey=trilogy")
        .then(function (response) {
          console.log(`
          Title: ${response.data.Title}
          Year: ${response.data.Year}
          IMDB Rating: ${response.data.imdbRating}
          Rotten Tomatoes: ${response.data.Ratings[1].Value}
          Country: ${response.data.Country}
          Language: ${response.data.Language}
          Plot: ${response.data.Plot}
          Actors: ${response.data.Actors}`) 
          fs.appendFileSync("log.txt",data,function(err) {
              if (err) {
                return console.log(`Error appending to log.txt ${err}`)
            } else {
              console.log("Appended to log.txt")
            };
          });
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
          } ;
        });

    case  'movie-this':
    // "Movie via OMDB":
      movie();

      
      break;
    case 'concert-this':
    // "Concert via BandsInTown":
      concert();
      break;
    case 'do-what-it-says':
    // "Surprise Me":
      doIt();
      break;
    default:
       console.log("Sorry, spotify-this-song, movie-this, concert-this, & do-what-it says are the only valid commands.")
    }
  }


function concert() {
  queryURL = "https://rest.bandsintown.com/artists/" + target.trim() + "/events?app_id=codingbootcamp"
  // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
axios
.get(queryURL)
.then(function (response) {
  console.log("Concert: " + target)
  // console.log(response)
  // i'm limiting to 5, instead of response.data.length.  I don't see a limit to set in the query.  The default is supposed to be 5
  for (let i = 0; i<5; i++) {
      // let dateTime = "05/25/2019 8:00PM"
     var eventTime=moment(response.data[i].datetime).format('dddd, MM/DD/YYYY hh:mm A')
        console.log(`
      Venue: ${response.data[i].venue.name}
      Location: ${response.data[i].venue.city}, ${response.data[i].venue.region} ${response.data[i].venue.country}
      Event Date & Time: ${eventTime}
      _______________`) 
    var logText = '\n---Concert----' + '\nWhere: ' + response.data[i].venue.name + '\nWhen: ' + eventTime
    fs.appendFile('log.txt', logText, function (err) {
      if (err) throw err;
      console.log("Log updated");
    });      
  }
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
var spotify = new Spotify(keys.spotify);
spotify.search({
  type: 'track',
  query: target,
  limit: 1
},
  function (err, data) {
    if (err) {
      return console.log(`Error: ${err}`)
    }
  // console.log(data.tracks.items);
  let spotifyData = data.tracks.items[0];
  // for(let i=0; i<spotifyData.length; i++) {
    console.log(`
    Artist: ${spotifyData.album.artists[0].name}
    Song: ${spotifyData.name} 
    Album: ${spotifyData.album.name}
    Preview Link: ${spotifyData.external_urls.spotify}
    _______________`)
    var logText = '\n---Song----' + '\nSong: ' + spotifyData.name + '\nArtist: ' + spotifyData.album.artists[0].name
    fs.appendFile('log.txt', logText, function (err) {
      if (err) throw err;
      console.log("Log updated");
    });
  });
}

function movie() {
  // target = getNameof("Movie?")
  console.log("Movie: " + target);
  if (target === '') {
      target = "Mr Nobody"
    }
  queryURL = "http://www.omdbapi.com/?t=" + target.trim() + "&type=movie&y&plot=short&apikey=trilogy"
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
    Actors: ${response.data.Actors}
    _______________`)
    var logText = '\n----Movie----' + '\nTitle: ' + response.data.Title + '\nYear: ' + response.data.Year
    fs.appendFile('log.txt', logText, function (err) {
      if (err) throw err;
      console.log("Log updated");
    });
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
  console.log("Random.txt Command")
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

function getCommand() {
  console.clear()
  inquirer.prompt([
    {
      type: "list",
      name: "command",
      message: "What API do you want to try?",
      choices: ["Song via Spotify", "Movie via OMDB", "Concert via BandsInTown", "Surprise Me"]
    }
  ]).then(function (answers) {
    console.log(answers)
    command = answers.choices;
    console.log(command)
    return command
  });
}

function getNameof(targetType) {
  inquirer.prompt([
    {
      name: "target",
      message: "What " + targetType
    }
  ]).then(function (arg) {
    target = arg.target
    return target
  });
}

liriBot()

