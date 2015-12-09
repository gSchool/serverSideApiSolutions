var request = require('request');

// Our server is only meant to accept one argument, a url.
// Additionally, in node, the first 2 arguments are going to be 'node' and the name of the file being run
var url = 'http://www.omdbapi.com/?i=';

if(!process.argv[2]) {
    console.log("Sorry, you must provide an IMDB movie ID for this request");
    return;
}

url = url + process.argv[2];

console.log("Requesting data from: " + url);
console.log("================================");

request.get(url, function (error, response, body) {

    if (error) {
        console.log("Error!  Request failed - " + error);
    } else if (!error && response.statusCode === 200) {
        console.log(body);
    }
});