const axios = require("axios");
// omdbapi key: "http://www.omdbapi.com/?i=tt3896198&apikey=4b06ca2e"
//  // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
// var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";

// cSpell:ignore spotify, omdbapi, bandsintown, liri, codingbootcamp, wholestring,datetime,imdb,apikey
const spotify = require("node-spotify-api");
const moment = require("moment");
const inquirer = require("inquirer");
require("dotenv").config();
const fs = require("fs");
var keys = require("./keys.js")

var inputs = process.argv.slice(2);
console.log(inputs)
command=inputs[0]
i=1;
target=''
while (inputs[i]) {
  target = target+'%20'+inputs[i] 
  i++
}

console.log(`command  ${command} target  ${target}` );


function liriBot() {
  if (command ==='do-what-it-says'){
    console.log("Do: "+target)
    fs.readFile("random.txt","utf8",function (err,data) {
      if (err){
        return console.log(err)
      }
      let wholestring = data.split(",");
      command = wholestring[0];
      target = wholestring[1];

    })
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
    case 'spotify-this-song':
      console.log("Spotify: " +target)
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
      break;
    default:
      console.log("does not compute")
      break;
  }
}
liriBot();