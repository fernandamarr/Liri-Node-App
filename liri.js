// Require .env file to hide keys
require("dotenv").config();

// Require random.txt file system
var fs = require("fs");

// Require request to make http calls
var request = require("request");

// Require keys.js file
var keys = require("./keys.js");

// Require axios
var axios = require("axios");

// Initialize Spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Require Moment.js
var moment = require("moment");

// User command and input 
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");

// Switch statements for app logic
switch (input, command) {
    case "spotify-this":
        spotifySong();
        break;
    case "movie-this":
        if (input !== "") {
            movieThis(input);
        } else {
            input = "Mr. Nobody";
            movieThis(input);
        }
        break;
    case "concert-this":
        concertThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log(
            "Type any of the following commands to get started: " + " \n\n",
            "spotify-this-song" + "\n",
            "movie-this" + "\n",
            "concert-this" + "\n",
            "do-what-it-says");
}

function spotifySong() {
    if (input === undefined) {
        input = "The Sign Ace of Base";
    }
    spotify.search({
        type: 'track',
        query: input
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("\n|^^^^^^^^^^^^^^^^^^^^^|\n");
        console.log("Artist: " + data.tracks.items[0].artists[0].name + "\nSong name: " + data.tracks.items[0].name +
            "\nAlbum Name: " + data.tracks.items[0].album.name + "\nPreview Link: " + data.tracks.items[0].preview_url);
    })
}

function movieThis(input) {
    axios.get("https://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            var data = response.data;
            console.log(
                "\n" + "|^^^^^^^^^^^^^^^^^^^^^|" + "\n\n",
                "Title: " + data.Title + "\n",
                "Year Released: " + data.Year + "\n",
                "Movie Rating: " + data.imdbRating + "\n",
                "Rotten Tomatoes Rating: " + data.Ratings[2].Value + "\n",
                "Country: " + data.Country + "\n",
                "Language: " + data.Language + "\n",
                "Plot: " + data.Plot + "\n",
                "Actors: " + data.Actors
            );
        }
    );
}

function concertThis() {
    request("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp", function (error, response, body) {
        // If there is no error and http status code is 200 (okay), use JSON.parse() to format data
        if (!error && response.statusCode === 200) {
            var band = JSON.parse(body);
            // Loop through bands data
            if (band.length > 0) {
                for (i = 0; i < 1; i++) {
                    // Log name of venue, venue location, and date in MM/DD/YYY moment.js format
                    console.log(
                        "\nI see you got good taste in music! Here is the info for that artist:\n",
                        "\n" + "|^^^^^^^^^^^^^^^^^^^^^|" + "\n\n",
                        "Venue: " + band[i].venue.name + "\n\n",
                        "Location: " + band[i].venue.country + "\n");
                    // event in moment.js format
                    var concertDate = moment(band[i].datetime).format("MM/DD/YYY");
                    console.log("Concert Date: " + concertDate + "\n")
                };
            } else {
                console.log("Well, this is awkward... I can't find the data for this artist. Got a second choice?")
            }
        }
    })
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        var userCommand;
        var userInput;

        if (error) {
            return console.log("Beep Beep Boop\nThere was an error:\n\n" + error);
        }

        var dataArr = data.split(",");
        userCommand = dataArr[0].trim();
        userInput = dataArr[1].trim();

        if (userCommand === "movie-this") {
            movieThis(userInput);
        }
    });
    // Append text into the "log.txt" file.
    // If the file didn't exist, then it gets created on the fly.
    fs.appendFile('log.txt', "data to append", function (err) {
        if (err) throw err;
        console.log("Hooray, the data was saved!");
    })
}