// Hide keys
require("dotenv").config();

// Import the `keys.js` file 
var keys = require("./keys.js");

// Access keys info
var spotify = new Spotify(keys.spotify);

// Grab random.txt file system
var fs = require("fs");

// Grab axios package and run axios.get function (similar to ajax)
var axios = require("axios");

fs.readFile("random.txt", "utf-8", function (error, data) {
    if (error) {
        return console.log(error);
    } 
})

