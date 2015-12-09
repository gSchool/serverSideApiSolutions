var express = require('express'),
    app = express(),
    request = require('request');

app.get("/", function (req, res) {
    request.get('http://www.omdbapi.com/?i=tt4331680', function(error, response, body) {
        if (error) {
            res.status(500).send("You got an error - " + error);
        } else if (!error && response.statCode >= 300) {
            res.status(500).send("Something went wrong! Status: " + response.statusCode);
        }
        if (!error && response.statusCode === 200) {
            var movieData = JSON.parse(body);
            var result = "Title: " + movieData.Title + "<br>" + "Year: " + movieData.Year + "<br>";
            res.send(result);
        }
    });
});

app.listen(3000, function () {
    console.log("Starting a server on localhost:3000");
});