const axios = require("axios");
// omdbapi key: "http://www.omdbapi.com/?i=tt3896198&apikey=4b06ca2e"
//  // Querying the bandsintown api for the selected artist, the ?app_id parameter is required, but can equal anything
// var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
const spotify = require("node-spotify-api");
const moment = require("moment");
const inquirer = require("inquirer");
require("dotenv").config();
const fs = require("fs");
var keys = require("./keys.js")

var inputs = process.argv.slice(2);
command=inputs[0]
i=1;
target=''
while (inputs[i]) {
  target = target+'%20'+inputs[i] 
  i++
}
console.log(`command ` +command+ ` target ` +target );


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
      // venue name 
      // venue location
      // date of event
      break;
    case 'spotify-this-song':
      console.log("Spotify: " +target)
      break;
    case 'movie-this':
      console.log("Movie: "+ target)
      break;
    default:
      console.log("does not compute")
      break;
  }
}
liriBot();