# liri-node-app
This application utilizes 4 API modules:
Axios for returning data from BandsInTown and OMDBapi
node-spotify-api for Spotify,
moment for date/time conversion
and fs to read random commands and write logs to local text files.

I added inquirer, thinking that I could use it to make the user interface better, but node is asynchronous, and so the code moved on without waiting for the inquirer data to be evaluated.  I tried to find a synchronous version of inquirer, but nothing offers dropdown lists.

Spotify-this-song (with and without named targets), movie-this (with and without named targets), and do-what-it-says all function correctly and 
write mimimal tracking to log.txt.

I can't get concert-me to return results at this point, and I will work on this later.

printScreens folder shows printouts of the console logs, code shots, and log file.